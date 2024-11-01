import express from 'express';
import { getAllCountries } from './controller';
const route = express.Router();

route.get('/all-countries', getAllCountries);

export default route;
