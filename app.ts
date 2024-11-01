import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './modules/users/routes';
import userProfile from './modules/profile/route';
import sequelize, { default as db } from './config/db';
import getCountries from './modules/countries/route';

const Port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express());
app.use(bodyParser.json());

// Users Router

app.use('/api', authRoutes);
app.use('/api', userProfile);
app.use('/api', getCountries);

(sequelize.query('SELECT 1') as unknown as Promise<any>)
  .then(() => {
    console.log('Connected to DB');
    app.listen(Port, () => {
      console.log('working');
    });
  })
  .catch((error) => {
    console.log(error);
  });
