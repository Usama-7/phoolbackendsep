import express from "express";
import colors from 'colors'
import dotenv from "dotenv";
import dbconn from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import clientRouter from "./routes/clientRouter.js"
import adminRouter from "./routes/adminRouter.js"
import cors from "cors";


const app = express();




//config .env
dotenv.config();

// db connection
dbconn();

// cors configuration
app.use(cors());

app.use(express.json())

app.use('/uploads', express.static('uploads'));

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/client",clientRouter)
app.use("/api/v1/admin",adminRouter)



const PORT = process.env.PORT || 8000


app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`.bgYellow.blue)
})

