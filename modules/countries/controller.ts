import axios from 'axios';
import { Request, Response } from 'express';

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.paystack.co/bank', {
      headers: {
        Authorization: `Bearer YOUR_PAYSTACK_SECRET_KEY ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      params: {
        country: 'Nigeria',
      },
    });

    const banks = response.data.data.map((bank: any) => bank.name); // Contains an array of banks
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banks', error });
  }
};
