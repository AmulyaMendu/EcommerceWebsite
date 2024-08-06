import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors'
import path from "path"
dotenv.config();
const app = express()

//database config
connectDB()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


// --------------------deployment----------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname1, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))

    });

} else {
    console.log("ghjhg")
    app.get("/", (req, res) => {
        res.send("API is running here..");
    });
}

// --------------------deployment--------------


// app.get("/", (req, res) => {
//     res.send("welcome to website")
// })
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server is connected on ${process.env.DEV_MODE} mode on ${PORT}`)
})