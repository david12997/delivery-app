export const dynamic = 'force-dynamic'

import { GetData } from "@/services/get.data"
import { DeliveryJSON } from "../api/delivery/delivery.type";
import { ThemeProp } from "@/components/nav/nav.type";


const CoberturaPage = async ():Promise<JSX.Element> => {

    const data = await GetData([process.env.DOMAIN+'/api/delivery'])
    .then(res => res[0] as DeliveryJSON);

    const coberturaData = JSON.parse(data.body[0].restricciones as string) as {cobertura:{
        lugares:{nombre:string,descripcion:string}[]
    }};

    const theme = JSON.parse(data.body[0].data as string).theme as ThemeProp;

    return<section style={{color:theme.primary}} className=" overflow-y-scroll overflow-x-hidden shadow-[#7f7f7f] shadow-md absolute bottom-[10px] w-[94vw] ml-[3vw] md:w-[390px] md:ml-[10px] bg-white h-[160px] md:h-[250px] rounded-md">
        <h1 className="w-[100%] h-[35px] text-[18px] font-extrabold  flex items-center justify-center"> Cobertura</h1>
        {
            coberturaData.cobertura.lugares.map((item,index) => {

                return<div key={index} className="w-[98%]  text-[16px] font-extrabold p-2 mb-2">
                        <li>{item.nombre}</li>
                        <p className="text-[#6f6f6f]">{item.descripcion}</p>
                </div>
            })
        }
         <div className="w-[98%] text-[#6f6f6f]  text-[15px] font-extrabold p-2 mb-2">
            <li>La ruta de tu entrega  debe estar dentro de la zona de cobertura</li>
        </div>
    </section> 
}

export default CoberturaPage; 