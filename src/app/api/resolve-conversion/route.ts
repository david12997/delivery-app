export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { NextResponse } from 'next/server';
import { DB } from '@/db/config'; 

export async function POST(req:Request, res:Response) {


    try {
        
        const data = await req.json() as {stateConversion:string,secret_id:string,idConversion:number};

        //check if secret_id is valid
        if(data.secret_id !== process.env.SECRET_ID as string) return NextResponse.json({status:401,data:'Unauthorized'});

        //update conversion to DB
        const result = await DB.query('UPDATE conversion SET status_service = ? WHERE id = ?',[data.stateConversion,data.idConversion]);


        let response ={
            status:200,
            res:result
        }
    
        return NextResponse.json(response);
    }
    catch(err) {

        let response ={
            status:500,
            data:err
        }
    
        return NextResponse.json(response);
    }
    


}
