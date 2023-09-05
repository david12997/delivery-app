import { NextResponse } from 'next/server';
import { DB } from '@/db/config'; 

export async function POST(req:Request, res:Response) {


    try {
        
        const data = await req.json() as {secret_id:string,data:string};

        //check if secret_id is valid
        if(data.secret_id !== process.env.SECRET_ID as string) return NextResponse.json({status:401,data:'Unauthorized'});

        //insert conversion to DB
        const result = await DB.query('INSERT INTO conversion (owner_conversion, data_service) VALUES (?,?)',[1,JSON.stringify(data.data)]);


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