import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        const { user, password } = req.body;
        console.log( user+ password);
        res.status(200).json({ name: 'Login' })
    }
}
