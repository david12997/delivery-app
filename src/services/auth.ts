export const AuthUser = async(urls:string[],email:string,password:string) =>{

    try{


        const promises:any[] = [];

        urls.forEach((url:string, index:number)=>{
            
            promises[index] = fetch(url,{
                method: 'POST',
                cache: 'no-cache',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({secret_id:process.env.NEXT_PUBLIC_SECRET_ID,email:email,password:password}),
            })           
        
        });

        const response = await Promise.all(promises);
        return await Promise.all(response.map(res=>res.json()))
    
        
    
    } catch (error) {  
        
        throw error;
    }
    
}