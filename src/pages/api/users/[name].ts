import type { NextApiRequest, NextApiResponse } from 'next';
import { userStore } from 'utils/UserStore';
import type { UserCred } from '../../types';

type ApiRes =
  | UserCred
  | { error: string }
  | { success: boolean }
  | { success: boolean; message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiRes>
) {
  try {
    const { name } = req.query;
    const username = Array.isArray(name) ? name[0] : name;
    const cleanName = username ? decodeURIComponent(String(username)).trim() : null;

    console.log(`[API] /api/users/${cleanName} ${req.method}`);

    if (!cleanName) {
      return res.status(400).json({ error: 'invalid name' });
    }

    if (req.method === 'GET') {
      const found = userStore.findByName(cleanName);
      if (!found) return res.status(404).json({ error: 'user not found' });
      return res.status(200).json(found);
    }

    if (req.method === 'PATCH') {
      const patch = req.body as Partial<UserCred>;
      if (!patch || typeof patch !== 'object') {
        return res.status(400).json({ error: 'invalid body' });
      }
      const updated = userStore.update(cleanName, patch);
      if (!updated) return res.status(404).json({ error: 'user not found' });
      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      const removed = userStore.remove(cleanName);
      if (!removed) {
        return res
          .status(404)
          .json({ success: false, message: `El usuario "${cleanName}" no existe` });
      }
      return res
        .status(200)
        .json({ success: true, message: `El usuario "${cleanName}" fue eliminado correctamente` });
    }

    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error('[API] /api/users/[name] - unhandled error', err);
    return res.status(500).json({ error: 'internal server error' });
  }
}
