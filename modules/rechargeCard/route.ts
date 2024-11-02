import express, { RequestHandler } from 'express';
import { getAllNetworksInNigeria, rechargePhone } from './controller';
const route = express.Router();

route.get('/all-networks', getAllNetworksInNigeria as RequestHandler);
route.get('/recharge-phone', rechargePhone as RequestHandler);

export default route;
