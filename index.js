import express from 'express'
import { connectDB } from './db.js';
import userRoute from "./routes/user.route.js"
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1/user",userRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
