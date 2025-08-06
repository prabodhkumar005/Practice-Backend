import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './db.js';
import userRoute from "./routes/user.route.js"
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user",userRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
