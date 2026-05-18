import User from "../models/Users.js";
import Product from "../models/Products.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";

import cache from "../cachememo/cache.js";

const CACHE_KEY = "dashboard-stats";
// const CACHE_TTL=60*2  //2 MINS
// const CACHE_TTL = 60*5; //5mins

const CACHE_TTL = 5;

export const getOverview = async (req, res) => {
  try {
    const cached = await cache.get(CACHE_KEY);
    if (cached) return res.json({ success: true, data: cached });

    const now = new Date();
    const last7DaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      // !users
      totalUsers,
      newUsersToday,
      newUsersThisMonth,
      activeUsers,
      inactiveUsers,
      // !products
      totalProducts,
      outOfStock,
      lowStock,
      draftProducts,
      publishedProducts,
      archivedProducts,
      // !orders
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,

      //   REVENUE
      revenueLast7Days,
      revenueStatusThisMonth,
      revenueStatusAllTime,

      //   !categories
      totalCategories,
      activeCategories,
      inactiveCategories,
      productsPerCategory,
    ] = await Promise.all([
      // !users
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: startOfToday } }),
      User.countDocuments({ createdAt: { $gte: startOfMonth } }),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: false }),

      // !products

      Product.countDocuments(),
      Product.countDocuments({ stock: 0 }),
      Product.countDocuments({ stock: { $gt: 0, $lt: 10 } }),
      Product.countDocuments({ status: "draft" }),
      Product.countDocuments({ status: "published" }),
      Product.countDocuments({ status: "archived" }),

      // !orders

      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "confirmed" }),
      Order.countDocuments({ status: "shipped" }),
      Order.countDocuments({ status: "delivered" }),
      Order.countDocuments({ status: "cancelled" }),

      // REVENUE

      // Order.aggregate([
      //     { $match: { status: "delivered",paymentStatus:"paid",createdAt: { $gte: startOfToday } } },
      //     { $group: { _id: null, total: { $sum: "$pricing.total" } } }
      //   ]),

      Order.aggregate([
        {
          $match: {
            status: "delivered",
            paymentStatus: "paid",
            //            // createdAt: { $gte: last7DaysAgo },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$deliveredAt" },
            },
            total: { $sum: "$pricing.total" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([
        {
          $match: {
            status: "delivered",
            paymentStatus: "paid",
            createdAt: { $gte: startOfMonth },
          },
        },
        { $group: { _id: null, total: { $sum: "$pricing.total" } } },
      ]),
      Order.aggregate([
        { $match: { status: "delivered", paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$pricing.total" } } },
      ]),
      //   !categories
      Category.countDocuments(),
      Category.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: false }),
      Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        { $project: { _id: 0, name: "$category.name", count: 1 } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
    ]);

    const formatDate = (d) => d.toISOString().split("T")[0];
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return formatDate(d);
    });

    const map7 = new Map(revenueLast7Days.map((i) => [i._id, i.total]));

    // final output
    const last7DaysRevenue = last7Days.map((date) => ({
      date,
      total: map7.get(date) || 0,
    }));

    const data = {
      users: {
        total: totalUsers,
        newToday: newUsersToday,
        newThisMonth: newUsersThisMonth,
        active: activeUsers,
        inactive: inactiveUsers,
      },
      products: {
        total: totalProducts,
        outOfStock,
        lowStock,
        draft: draftProducts,
        published: publishedProducts,
        archived: archivedProducts,
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        confirmed: confirmedOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
      },
      revenue: {
        last7Days: last7DaysRevenue,
        thisMonth: revenueStatusThisMonth || 0,
        allTime: revenueStatusAllTime || 0,
      },
      categories: {
        total: totalCategories,
        active: activeCategories,
        inactive: inactiveCategories,
        topSelling: productsPerCategory,
      },
    };
    cache.set(CACHE_KEY, data, CACHE_TTL);
    return res.json({ success: true, data });
  } catch (error) {
     console.error(error);
    return res.status(500).json({ success: false, message: "Failed to load dashboard data" });
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
