import { NextResponse } from 'next/server';
import { DB } from '@/db/config'; 

export async function POST(req:Request, res:Response) {


    try {
        
        const data = await req.json() as {secret_id:string,data:string};

        //check if secret_id is valid
        if(data.secret_id !== process.env.SECRET_ID as string) return NextResponse.json({status:401,data:'Unauthorized'});

        //insert conversion to DB
        const result = await DB.query('INSERT INTO conversion (owner_conversion, data_service, data_state) VALUES (?,?,?)',[1,JSON.stringify(data.data),JSON.stringify({status:'pending'})]);


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

export async function PUT(req:Request, res:Response) {

    try {
            
        const data = await req.json() as {secret_id:string,offset:string};

        //check if secret_id is valid
        if(data.secret_id !== process.env.SECRET_ID as string) return NextResponse.json({status:401,data:'Unauthorized'});

        // select conversion from DB
        const [rows,fileds]  = await DB.query(`SELECT * FROM conversion WHERE owner_conversion = 1 AND status_service = 'pending' ORDER BY id DESC LIMIT 9`);
    
        return NextResponse.json(rows);

    } catch (error) {

        let response ={
            status:500,
            data:error
        }
    
        return NextResponse.json(response);
    }
}