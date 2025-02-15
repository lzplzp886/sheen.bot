// src/app/api/payfast/payfast.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // 1. Gather environment variables
  const {
    PAYFAST_MERCHANT_ID,
    PAYFAST_MERCHANT_KEY,
    PAYFAST_PASSPHRASE,
    PAYFAST_RETURN_URL,
    PAYFAST_CANCEL_URL,
    PAYFAST_NOTIFY_URL
  } = process.env;

  const { parentName, childName, classType, paymentType } = req.body;
  
  // 2. Prepare Payment Data
  const orderId = `order_${Date.now()}`; // or use a real unique ID from DB
  const orderAmount = 1000.00; // e.g. R1000 for the course

  // Base fields for once-off
  const payfastData: Record<string, string> = {
    merchant_id: PAYFAST_MERCHANT_ID || '',
    merchant_key: PAYFAST_MERCHANT_KEY || '',
    return_url: PAYFAST_RETURN_URL || '',
    cancel_url: PAYFAST_CANCEL_URL || '',
    notify_url: PAYFAST_NOTIFY_URL || '',
    name_first: parentName,
    name_last: childName,
    m_payment_id: orderId,
    amount: orderAmount.toFixed(2),
    item_name: `Sheen Robotics - ${classType} Class`
  };

  // 3. If recurring, add subscription fields
  if (paymentType === 'recurring') {
    payfastData['subscription_type'] = '1';
    payfastData['billing_date'] = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    payfastData['recurring_amount'] = payfastData.amount;
    payfastData['frequency'] = '3'; // monthly
    payfastData['cycles'] = '0';    // indefinite
  }

  // 4. Generate the signature string in the correct order
  let signatureString = Object.keys(payfastData)
    .filter(key => payfastData[key] !== '') // no empty fields
    .sort() // sort by key
    .map(key => `${key}=${encodeURIComponent(payfastData[key]).replace(/%20/g, '+')}`)
    .join('&');

  if (PAYFAST_PASSPHRASE) {
    signatureString += `&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE).replace(/%20/g, '+')}`;
  }
  
  const signature = crypto.createHash('md5').update(signatureString).digest('hex');
  
  // 5. Construct the redirect URL to PayFast
  const payfastBaseUrl = 'https://sandbox.payfast.co.za/eng/process'; 
  // For production, use: 'https://www.payfast.co.za/eng/process'
  
  // build the final redirect URL with query params
  const payfastUrl =
    payfastBaseUrl +
    '?' +
    Object.keys(payfastData)
      .sort()
      .map(key => `${key}=${encodeURIComponent(payfastData[key]).replace(/%20/g, '+')}`)
      .join('&') +
    `&signature=${signature}`;

  // 6. Return the PayFast URL to the client
  res.status(200).json({ payfastUrl });
}
