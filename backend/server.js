import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import "dotenv/config";
import recipeRoutes from './routes/recipeRoutes.js'
import authRoutes from "./routes/authRoutes.js";

//dotenv.config()

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// healthcheck route
app.get('/',(req,res) => {
    res.json({message:"ChefGPT API running"});
})

// Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`MongoDB connected`)
    const PORT = process.env.PORT || 5000
    app.listen(PORT, ()=> console.log(`Server is listening to port ${PORT}`))
})
.catch((err)=> {
    console.log(`MongoDB connection error ${err.message}`)
    process.exit(1)
})