import express, { RequestHandler } from 'express';
import { Request, Response } from 'express';
import { getUserProfileById } from './controller';
const route = express.Router();

route.get('/profile/:id', getUserProfileById as RequestHandler);

export default route;
