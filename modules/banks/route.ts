import express, { RequestHandler } from 'express';
import { getAllBanks, resolveAccountName } from './controller';
const route = express.Router();

route.get('/all-banks', getAllBanks as RequestHandler);
route.post('/resolve-acct-name', resolveAccountName as RequestHandler);

export default route;
