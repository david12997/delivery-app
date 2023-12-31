
export const NewConversion = async(dataConversion:any) =>{

    try{


        const response = await fetch(process.env.NEXT_PUBLIC_DOMAIN+'/api/conversion', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({secret_id:process.env.NEXT_PUBLIC_SECRET_ID as string,data:dataConversion})
        })
        

        return await response.json();
        
    
    } catch (error) {  
        
        throw error;
    }
    
}