import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());   
app.use(cors());

const mongoDB = 'mongodb://localhost:27017/ppPlaces';
mongoose
    .connect(mongoDB)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) =>{
    res.send('Welcome to ppPlaces API');
})

import placeRoutes from './routes/placeRoute.js';
app.use('/places', placeRoutes);

import authRoutes from './routes/userRoute.js';
app.use('/auth', authRoutes);

import reviewRoute from "./routes/reviewRoute.js";
app.use("/places/:id/reviews", reviewRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));