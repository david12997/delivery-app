export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config';
import { Body, DeliveryJSON } from './delivery.type';

export async function GET() {

    const [rows,fileds] = await DB.query('SELECT * FROM delivery_routes WHERE id = 1 ');
    const response:DeliveryJSON ={
        status:200,
        body:rows as Body[]
    } 


    return NextResponse.json(response);

}