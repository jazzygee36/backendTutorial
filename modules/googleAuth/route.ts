import express, { RequestHandler } from 'express';

const route = express.Router();
import passport from 'passport';

// Route to initiate Google OAuth2 authentication
route.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth2 callback route
route.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to your desired route
    res.redirect('/dashboard');
  }
);

// Route to log out the user
// route.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

export default route;
