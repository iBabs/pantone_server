import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogsRoute from './routes/blogsRoute.js';
import AuthRouter from './routes/authorRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static('public'));

const PORT = process.env.PORT || 4321;


app.use('/api/v1/blogs', blogsRoute)
app.use('/api/v1/auth', AuthRouter);



app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to your ultimate blogging server 🥰' });
})





app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB', err);
});