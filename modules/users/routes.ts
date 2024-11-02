import express, { RequestHandler } from 'express';
import {
  CreateUsers,
  loginUsers,
  getAllUsers,
  getUserById,
  deleteUserById,
  requestPasswordReset,
  resetPassword,

} from './controller';
const route = express.Router();

route.post('/register', CreateUsers);
route.post('/login', loginUsers as RequestHandler);
route.get('/getUsers', getAllUsers);
route.get('/user/:id', getUserById as RequestHandler);
route.delete('/user/:id', deleteUserById as RequestHandler);
route.post('/forgot-password', requestPasswordReset as RequestHandler);
route.post('/reset-password/:token', resetPassword as RequestHandler);

export default route;
