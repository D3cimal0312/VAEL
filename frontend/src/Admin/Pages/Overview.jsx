import React from 'react'
import { usedashboard } from '@/hooks/dashboards/usedashboard.js'
import Uicard from '../common/Uicard'
import Weeksrevenue from '../components/Overview/Weeksrevenue.jsx'
import Orderstatus from '../components/Overview/Orderstatus.jsx'
import TopSellingCategories from '../components/Overview/TopSellingCategories.jsx'
import {DashboardSkeleton} from '@/components/ui/Skeletons.jsx'
import ProductHealth from '../components/Overview/ProductHealth.jsx'

const Overview = () => {
  const { overview, loading } = usedashboard();

  if (loading) return <DashboardSkeleton />;

  const statCards = [
    {
      title: "Total Users",
      value: overview.users.total,
      subvalue1: overview.users.newThisMonth,
      subtitle1: "Joined this month",
    },
    {
      title: "Total Products",
      value: overview.products.total,
      subvalue1: overview.products.published,
      subtitle1: "Published",
      subvalue2: overview.products.draft,
      subtitle2: "Draft",
    },
    {
      title: "Total Orders",
      value: overview.orders.total,
      subvalue1:
        ((overview.orders.delivered / overview.orders.total) * 100).toFixed(2) +
        "%",
      subtitle1: "Delivery Rate",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${overview.revenue.allTime[0].total}`,
      subvalue1: overview.revenue.thisMonth[0].total,
      subtitle1: "This Month",
    },
    {
      title: "Total Categories",
      value: overview.categories.total,
      subvalue1: overview.categories.active,
      subtitle1: "Active",
    },
  ];

  return (
    <div className="font-fair p-8">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {statCards.map((card) => (
          <Uicard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4 mt-4">
        <div className="bg-card rounded-2xl col-span-4 ">
          <Weeksrevenue revenueData={overview.revenue.last7Days} />
        </div>
        <div className="col-span-1">
          <Orderstatus ordersData={overview.orders} />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1  ">
          <ProductHealth products={overview.products} />
        </div>

        <div className="flex-1 ">
          <TopSellingCategories categories={overview.categories.topSelling} />
        </div>
      </div>
    </div>
  );
};

export default Overview

export default Overview;
