
export const GetData = async(urls:string[]) =>{

    try{


        const promises:any[] = [];

        urls.forEach((url:string, index:number)=>{
            
            promises[index] = fetch(url,{
                cache: 'no-cache',
                headers:{
                    'Content-Type': 'application/json'
                }
            })           
        
        });

        const response = await Promise.all(promises);
        return await Promise.all(response.map(res=>res.json()))
    
        
    
    } catch (error) {  
        
        throw error;
    }
    
}