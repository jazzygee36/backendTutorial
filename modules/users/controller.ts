import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/schema';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const CreateUsers = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const findEmail = await User.findOne({ where: { email } });
    if (findEmail) {
      res.status(401).json({ message: 'email already exist' });
    } else {
      await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(200).json({ message: 'successfully registered' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const loginUsers = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email not found' });
    }

    // Compare provided password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      JWT_SECRET as string, // Secret key from your environment variables
      { expiresIn: '1h' } // Token expiration time
    );

    // Send response with token and user info (excluding sensitive data like password)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming the ID is passed as a route parameter
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Exclude the password attribute
    });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params; // Assuming the ID is passed as a route parameter
  try {
    const user = await User.destroy({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const token = jwt.sign({ id: user.id }, JWT_SECRET as string, {
      expiresIn: '1h',
    });

    // Send email with reset link (you need to set up a transporter)
    const transporter = nodemailer.createTransport({
      // Configure your mail service (e.g., SMTP, Gmail, etc.)
      host: '127.0.0.1', // Use IPv4 address
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'jazzygee36@gmail.com', // your SMTP username
        pass: 'mesioyesamson', // your SMTP password
      },
    });

    const resetLink = `http://yourapp.com/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Function to reset the password
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET as string);
    const userId = (decoded as any).id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
