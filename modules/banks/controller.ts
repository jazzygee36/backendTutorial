import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const getAllBanks = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.paystack.co/bank', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      params: {
        country: 'Nigeria',
      },
    });

    const banks = response.data.data; // Contains an array of banks
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banks', error });
  }
};

export const resolveAccountName = async (req: Request, res: Response) => {
  const { accountNumber, bankCode } = req.body;
  if (!accountNumber || !bankCode) {
    return res
      .status(400)
      .json({ message: 'Account number and bank code are required' });
  }

  try {
    const response = await axios.get('https://api.paystack.co/bank/resolve', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      params: {
        account_number: accountNumber,
        bank_code: bankCode,
      },
    });

    // Send the account name in the response
    res.status(200).json({ accountName: response.data.data.account_name });
  } catch (error) {
    res.status(500).json({ message: 'Error resolving account name', error });
  }
};
