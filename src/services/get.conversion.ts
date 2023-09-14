
export const GetConversion = async(urls:string[],offset:string) =>{

    try{


        const promises:any[] = [];

        urls.forEach((url:string, index:number)=>{
            
            promises[index] = fetch(url,{
                method: 'PUT',
                cache: 'no-store',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({secret_id:process.env.NEXT_PUBLIC_SECRET_ID,offset:offset}),
            })           
        
        });

        const response = await Promise.all(promises);
        return await Promise.all(response.map(res=>res.json()))
    
        
    
    } catch (error) {  
        
        throw error;
    }
    
}