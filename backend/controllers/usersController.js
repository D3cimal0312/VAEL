import Users from "../models/Users.js";

// !reading the users
export const getAllUsers = async (req, res) => {
  try {
    const { q, role,page=1,limit=10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const allowedRoles = ["admin", "customer"];
    const filter = q
      ? {
          $or: [
            { firstName: { $regex: q, $options: "i" } },
            { lastName: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
          ],
        }
      : {};
    if (role && allowedRoles.includes(role)) {
      filter.role = role;
    }

    const users = await Users.find(filter).skip(skip).limit(Number(limit));
    const totalCount = await Users.countDocuments(filter);
    const totalPage = Math.ceil(totalCount / Number(limit));
    res.status(200).json({ data: users, count: totalCount,totalPage ,page});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// !getting a single user
export const getUserById = async (req, res) => {
  try {
    console.log(req.user.id,"user")
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "unable to fine any users" });
    }

    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ messsage: err.message });
  }
};
// // Getting a user by username/email

// export const getUser = async (req, res) => {
//   try {
//     const user = await Users.findOne({ username: req.params.username });
//     if (!user) {
//       return res.status(404).json({ message: "unable to fine any users" });
//     }

//     res.status(200).json({ data: user });
//   } catch (err) {
//     res.status(500).json({ messsage: err.message });
//   }
// };
// !updating a single user data
export const updateUser = async (req, res) => {
  try {
  
    const targetUser = await Users.findById(req.params.id);   
    console.log(targetUser,"target user*****************")
    if (!targetUser)
      return res.status(404).json({ message: "User not found" });

    if (targetUser.role === "admin")
      return res.status(409).json({ message: "Cannot modify another admin" });

    const allowedFields = ["isActive", "role"];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== "")
        updates[field] = req.body[field];
    });

    if(updates.role==="admin" && updates.isActive===false)
    return res.status(409).json({ message: "Cannot modify another admin" });
    const updated = await Users.findByIdAndUpdate(req.params.id, updates, {  
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ data: updated });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateMe = async (req, res) => {
  try {
    const allowedFields = ["firstName", "lastName", "email"];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await Users.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user)
      return res.status(404).json({ message: "requested user wasnot found" });

    res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateAddress = async (req, res) => {
  console.log(req.params);
  try {
    const { type } = req.params;
    console.log(1);
    if (!["home", "work"].includes(type)) {
      return res
        .status(400)
        .json({ message: "requested type is not avaliable" });
    }
    console.log(2);

    const allowedFields = [
      "houseNum",
      "localAddress",
      "district",
      "province",
      "phone",
    ];
    const update = {};
    console.log(3);

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    });
    console.log(4);

    const user = await Users.findByIdAndUpdate(
      req.user.id,
      { $set: { [`address.${type}`]: update } },
      { returnDocument: "after" },
    );

    console.log(5);

    if (!user) return res.status(404).json({ message: "user not found" });

    console.log(6);

    return res
      .status(200)
      .json({ data: user, message: "update address successfull" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const getMyAddress = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "unable to fine any users" });
    }

    res.status(200).json({ data: user.address });
  } catch (err) {
    res.status(500).json({ messsage: err.message });
  }
};
