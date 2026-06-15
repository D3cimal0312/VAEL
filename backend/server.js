import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

import connectMainDB from "./config/maindb.js";

import express from "express";
// routes import
import productsRoutes from "./routes/productsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favRoutes from "./routes/favRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


import dashboardRoutes from "./routes/dashboardRoutes.js";

import emailRoutes from "./routes/emailRoutes.js"; 
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); //!lets Express read JSON  bodies

connectMainDB();

// Testing routee
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// !authorization adn authentication
app.use("/auth", authRoutes);

// !products routes
app.use("/products", productsRoutes);

// !category route
app.use("/categories", categoryRoutes);

// !users routes
app.use("/users", userRoutes);

// !cart routes
app.use("/cart", cartRoutes);

app.use("/favourites", favRoutes);

app.use("/order", orderRoutes);


app.use("/dashboard",dashboardRoutes)
// !for front end safeguard

// email routes protection
app.use("/email",emailRoutes)

// Connect to MongoDB then start server
app.listen( 5000, () => {
  console.log(`SERVER RUNNING ON PORT ${process.env.PORT || 5000}`);
});
// todo:chekcin regading validators in schema for all models
