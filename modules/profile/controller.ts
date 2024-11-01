import { Request, Response } from 'express';
import User from '../model/schema';

export const getUserProfileById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Exclude the password attribute
    });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};
