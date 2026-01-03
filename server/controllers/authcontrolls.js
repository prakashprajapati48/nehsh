import { connection } from '../db/db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

let otpsender = async (useremail, otp) => {
    try {
        const info = await resend.emails.send({
            from: "NEHSH <onboarding@resend.dev>",
            to: useremail,
            subject: "Verify your NEHSH account",
            html: `<h3>Your OTP is: ${otp}</h3>`
        });

        console.log(`Email send status: ${info}`);
    }

    catch (err) {
        console.error(`Error mail sending: ${err}`)
    }
}

export const signup = async (req, res) => {
    const { username, useremail, userpass } = req.body;
    try {
        console.log("useremail is: ", useremail)

        let sqlcmd = `INSERT INTO users ( username,email, userpass) VALUES (?,?,?)`;

        let checkexist = "SELECT * FROM users WHERE username = $1";

        let saltround = 10
        let salt = await bcrypt.genSalt(saltround)
        let hashpass = await bcrypt.hash(userpass, salt);

        connection.query(checkexist, [username], (err, result) => {
            if (err) {
                console.error(`Error in database finding user`)
            }

            if (result.length > 0) {
                console.log(`${username} already exist`)
                return res.status(400).json({ message: "User already created account" });
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            const expiresAt = Date.now() + 5 * 60 * 1000;

            otpsender(useremail, otp);

            connection.query("select * from pending_users WHERE email=$1", [useremail], (err, pendingRes) => {
                if (err) {
                    console.error(`Error in pending user db: ${err}`)
                }

                if (pendingRes.length > 0) {
                    connection.query("UPDATE pending_users SET otp = $1, expires_at = ? WHERE email = $2", [otp, expiresAt, useremail])
                }

                connection.query(
                    "INSERT INTO pending_users (username, email, password, otp, expires_at) VALUES ($1,$2,$3,$4,$5)",
                    [username, useremail, hashpass, otp, expiresAt]
                );
            })


            return res.status(201).json({ email: useremail, message: "Otp Send successfully" });

        })
    }

    catch (err) {
        console.error(`Error in data recieve: ${err}`)
    }
}

export const otp_verify = async (req, res) => {
    const { otp, email } = req.body;

    let sqlcmd = `INSERT INTO users ( username,email, userpass) VALUES ($1,$2,$3)`;

    connection.query("SELECT * FROM pending_users WHERE email = $1", [email], (err, res1) => {
        if (err) {
            console.error(`Error: ${err}`);
            return res.status(400).json({ message: "Signup data not found" });
        }

        if (res1.length === 0) {
            console.error("User not found");
        }

        if (String(res1[0].otp) !== String(otp)) {
            console.log(`${otp} Otp is wrong`);
            return res.status(400).json({ message: "Invalid OTP" });
        }

        connection.query(sqlcmd, [res1[0].username, res1[0].email, res1[0].password])

        connection.query("DELETE FROM pending_users WHERE email = $1", [email])

        res.json({ message: "Account created successfully" });
    })
}

export const login = async (req, res) => {
    const { loginuser, loginpass } = req.body;

    let userexist = "SELECT * FROM users WHERE username = $1";
    console.log("user name is:", loginuser)

    connection.query(userexist, [loginuser], (err, result) => {
        if (err) {
            console.error(`Error in database: ${err}`)
            return res.status(201).json({ message: "Login server in error" });
        }

        if (result.length > 0) {

            let dbpass = result[0].userpass;
            bcrypt.compare(loginpass, dbpass, (err, resu) => {
                if (err) {
                    console.error("Error")
                }

                if (!resu) {
                    console.log("password not match")
                    // res.json({ message: "Password not match" })
                    return res.status(201).json({ message: "Enter password not match" });
                }

                let jwt_secert = "ecomm"

                let logintoken = jwt.sign({ userId: result[0].userId, useremail: result[0].email, username: result[0].username, usrepass: result[0].userpass },
                    jwt_secert,
                    { expiresIn: '1h' }
                )

                // console.log(`User token is: ${logintoken}`)
                console.log("Successfuly login")
                return res.json({
                    message: "Successfully login",
                    username: result[0].username,
                    token: logintoken
                });
            })
        }
    })
}

export const admin = async (req, res) => {
    res.send("hello")
}

export const addData = async (req, res) => {
    const { productName, price, desc, category, quantity, stock } = req.body;
    // const { file } = req.file;
    const imageFile = req.file ? req.file.filename : null;
    // console.log(`Uploaded data is: ${productName} ${price} ${desc} ${category} ${quantity} ${stock}`)
    // console.log(`File is: ${imageFile}`)
    // console.log("Added Data!")
    // res.json({ msg: "Hello " })
    let insetquery = "INSERT INTO `userdata` (`productName`, `productDesc`, `productPrice`,`category`,`availableQuantity`,`quantity`,stock,`file`) VALUES (?, ?,?,?,?,?,?,?)";
    connection.query(insetquery, [productName, desc, price, category, quantity, quantity, stock, imageFile], (err, result) => {
        if (err) {
            console.error(`Error in database connection insetion: ${err}`)
        }
        if (!result) {
            console.error(`Error in result: ${result}`)
        }
        console.log("Done")
    })
    res.send({ msg: "Done" })
}

export const dataRetrive = async (req, res) => {
    let search_query = "SELECT * FROM userdata"

    connection.query(search_query, (err, result) => {
        if (err) {
            console.error(`Error: ${err}`)
        }
        res.send(result.rows)
    })
}

export const users = async (req, res) => {
    let query = "SELECT * FROM users";

    connection.query(query, (err, result) => {
        if (err) throw console.error(`Error in user data getting: ${err}`);

        // console.log(`user retrive data is: ${result}`)
        res.send(result.rows)
    })
}

export const updateProduct = async (req, res) => {
    const { NewTitle, NewDesc, newPrice, newQuant, productID } = req.body;
    let sqlQuery = "UPDATE `userdata` SET `productName`=$1,`productDesc`=$2,`productPrice`= $3,`availableQuantity`$4? WHERE `userdata`.`productId` = $5";

    connection.query(sqlQuery, [NewTitle, NewDesc, newPrice, newQuant, productID], (err, result) => {
        if (err) console.error(`Error: ${err}`);

        // res.send("Update successfully data!")
        res.redirect(302, "/Update successfully data")
    })
}

export const deleteProduct = async (req, res) => {
    const { productID } = req.body;

    let deleteQuery = "DELETE FROM userdata WHERE `userdata`.`productId` = ?";

    connection.query(deleteQuery, [productID], (err, result) => {
        if (err) console.error(`Error: ${err}`);

        console.log(`Delete id is: ${productID}`)

        console.log("Data Delete")

        res.send("Product Deleted")
    })
}

export const searchProduct = async (req, res) => {
    const { searchData } = req.body;

    let sqlQuery = "SELECT * FROM `userdata` WHERE `productName` LIKE $1";

    connection.query(sqlQuery, [`%${searchData}%`], (err, result) => {
        if (err) console.error(`Error ${err}`);

        res.send(result.rows)
    })
}

export const categoryProduct = async (req, res) => {
    const { category } = req.body;
    let sqlQuery = "SELECT * FROM `userdata` WHERE `category` = $1";

    try {
    const result = await connection.query(
      "SELECT * FROM userdata WHERE category = $1",
      [category]
    );

    res.json(result.rows); // ✅ rows
  } catch (err) {
    console.error("Error in sql query:", err);
    res.status(500).json({ error: "Database error" });
  }
}

export const razorpay = async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_ID
    })

    const option = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: 1
    }

    try {
        const response = await razorpay.orders.create(option)

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const paymentGet = async (req, res) => {
    const { paymentId } = req.params;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_ID
    })

    try {
        const payment = await razorpay.payments.fetch(paymentId)

        if (!payment) {
            res.send(500).json("Error at razor pay loading")
        }

        res.json({
            status: payment.status,
            amount: payment.amount,
            method: payment.method,
            currency: payment.currency
        })
    } catch (error) {
        res.status(500).json("Failed to fetch")
    }
}
