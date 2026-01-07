import express from 'express';
import cors from 'cors';
import path from "path";
import fs from "fs";
import authcontroller from './route/authRoutes.js';

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// app.use("/uploads", express.static("uploads"));

const uploadPath = path.join(process.cwd(), "uploads");

// Ensure uploads folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

app.use("/uploads", express.static(uploadPath));

app.use("/api/auth",authcontroller);

app.listen(5000, () => {
    console.log(`Server is running on: http://localhost:5000`)
})
