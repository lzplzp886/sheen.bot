// src/app/api/payfast/notify.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payfastData = req.body; // Must parse properly if not automatically done
  const {
    PAYFAST_PASSPHRASE
  } = process.env;

  // 1. Construct signature string from POST data in the same order
  // (Remember to exclude `signature` itself).
  let signatureString = Object.keys(payfastData)
    .filter(key => key !== 'signature' && payfastData[key] !== '')
    .sort()
    .map(key => `${key}=${encodeURIComponent(payfastData[key]).replace(/%20/g, '+')}`)
    .join('&');

  if (PAYFAST_PASSPHRASE) {
    signatureString += `&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE).replace(/%20/g, '+')}`;
  }

  const signatureCheck = crypto.createHash('md5').update(signatureString).digest('hex');

  // 2. Compare signature
  if (signatureCheck !== payfastData.signature) {
    console.error('Signature mismatch');
    return res.status(400).end(); // or log an error
  }

  // 3. (Optional) Validate payment data (merchant_id, amount, etc.)
  // 4. Update your database (DynamoDB or RDS) with success or failure
  // 5. Acknowledge receipt by returning HTTP 200
  console.log('IPN validated. Payment details:', payfastData);
  res.status(200).end();
}
