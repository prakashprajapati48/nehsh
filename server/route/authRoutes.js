import express from 'express'
import { signup, login, admin, addData, dataRetrive, users, updateProduct, deleteProduct, searchProduct, categoryProduct, otp_verify, razorpay, paymentGet } from '../controllers/authcontrolls.js'
const router = express.Router()
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + " _ " + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post("/signup", signup)
router.post("/login", login)
router.post("/otp_verify", otp_verify)
router.post("/admin", admin)
router.post("/addData", upload.single("product_img"), addData)
router.get("/dataRetrive", dataRetrive)
router.get("/users", users)
router.post("/updateproduct", updateProduct)
router.post("/deleteProduct", deleteProduct)
router.post("/searchProduct", searchProduct)
router.post("/categoryProduct", categoryProduct)
router.post("/paymentrazor", razorpay)
router.get("/paymentr/:paymentId", paymentGet)

export default router