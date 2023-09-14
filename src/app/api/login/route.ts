export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';
import bcryptjs from 'bcryptjs'; // Importa bcryptjs en lugar de bcrypt

export async function POST(req: Request, res: Response) {
    try {
        const data = await req.json() as { secret_id: string, email: string, password: string };
        
        // Check if secret_id is valid
        if (data.secret_id !== process.env.SECRET_ID as string) {
            return NextResponse.json({ status: 401, data: 'Unauthorized' });
        }

        const [rows, fields] = await DB.query('SELECT * FROM owner_routes WHERE id = 1 AND email = ?', [data.email]);

        // Check if user is valid
        if ((rows as any[]).length === 0) {
            return NextResponse.json({ status: 404, data: 'Not Found, Unauthorized' });
        }

        // Check if password is valid using bcryptjs
        const isPasswordValid = await bcryptjs.compare(data.password, (rows as any[])[0].contrasena);

        if (!isPasswordValid) {
            return NextResponse.json({ status: 401, data: 'Unauthorized' });
        }

        console.log(rows);

        const response = {
            status: 200,
            data: rows
        };

        return NextResponse.json(response);
    } catch (err) {
        console.log(err);
        let response = {
            status: 500,
            data: err
        };

        return NextResponse.json(response);
    }
}