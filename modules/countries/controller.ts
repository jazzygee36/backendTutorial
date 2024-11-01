import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://api.paystack.co/country', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });
    const countryName = response.data.data.map((country: any) => country.name);
    // Send the list of countries in the response
    res.status(200).json({ message: countryName });
  } catch (error) {
    if (error) {
      // The request was made and the server responded with a status code
      res.status(500).json({ message: error });
    } else {
      // Something happened in setting up the request
      res.status(500).json({ message: 'Error fetching countries' });
    }
  }
};
