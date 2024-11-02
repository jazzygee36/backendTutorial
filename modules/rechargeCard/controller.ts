// controllers/vendorController.ts
import { Request, Response } from 'express';
import Vendor from '../model/schema';

// controllers/networkController.ts

export const getAllNetworksInNigeria = (req: Request, res: Response) => {
  const networks = [
    { id: 1, name: 'MTN' },
    { id: 2, name: 'GLO' },
    { id: 3, name: 'Airtel' },
    { id: 4, name: '9mobile' },
  ];
  res.status(200).json(networks);
};

export const rechargePhone = (req: Request, res: Response) => {
  const { networkId, phoneNumber, amount } = req.body;

  if (!networkId || !phoneNumber || !amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (amount < 50) {
    return res
      .status(400)
      .json({ message: 'Amount cant be less than 50naira' });
  }
  try {
    // Here you would integrate with an external API to handle the recharge.
    // Example (pseudo-code):
    // const result = await rechargeApi.buyRecharge({ networkId, phoneNumber, amount });

    // Simulating success response for demonstration
    const result = {
      status: 'success',
      message: `Recharge card of ₦${amount} to ${phoneNumber} on network ID ${networkId} was successful.`,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
