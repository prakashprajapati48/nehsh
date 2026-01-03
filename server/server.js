import express from 'express';
import cors from 'cors';
import path from "path";
import authcontroller from './route/authRoutes.js'

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/uploads", express.static("uploads"));

app.use("/api/auth",authcontroller);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/",(req,res)=>{
    res.redirect(302,"http://localhost:5173")
})

app.listen(5000, () => {
    console.log(`Server is running on: http://localhost:5000`)
})
