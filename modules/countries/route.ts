import express, { RequestHandler } from 'express';
import { getAllCountries } from './controller';
const route = express.Router();

route.get('/all-countries', getAllCountries as RequestHandler);

export default route;
