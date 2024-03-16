import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import Cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
// option 1
app.use(Cors());
// option 2 custom option
// app.use(
//     Cors({
//         origin: 'http://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Tyoe'],
// }));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log('App is listening to port: ${PORT}');
        });
    })
    .catch((error) => {
        console.log(error);
    });

