import type { NextApiRequest, NextApiResponse } from 'next';
import { userStore } from 'utils/UserStore';
import type { UserCred, ApiError } from '../../types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCred[] | UserCred | ApiError>
) {
  try {
    console.log('[API] /api/users', req.method);
    if (req.method === 'GET') {
      return res.status(200).json(userStore.list());
    }

    if (req.method === 'POST') {
      const { name, pass } = req.body as Partial<UserCred>;
      if (!name || !pass) return res.status(400).json({ error: 'name and pass required' });
      const created = userStore.create({ name, pass });
      if (!created) return res.status(409).json({ error: 'user already exists' });
      return res.status(201).json(created);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('[API] /api/users - unhandled error', err);
    return res.status(500).json({ error: 'internal server error' });
  }
}
