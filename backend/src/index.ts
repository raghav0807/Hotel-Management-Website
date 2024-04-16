require("dotenv").config({ path: "./.env" });
import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import path from "path";
import authRoutes from "./routes/auth";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { v2 as cloudinary } from "cloudinary";
// import myHotelRoutes from "./routes/my-hotels";
// import hotelRoutes from "./routes/hotels";
// import bookingRoutes from "./routes/my-bookings";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
const app = express();
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => console.error(err));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/my-hotels", myHotelRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/my-bookings", bookingRoutes);

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
