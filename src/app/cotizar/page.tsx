export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { GetData } from "@/services/get.data"
import { DeliveryJSON } from "../api/delivery/delivery.type";
import CotizarComponent from "@/components/cotizar/cotizar";
import ResponseCotizar from "@/components/cotizar/client/response";
import { ThemeProp } from "@/components/nav/nav.type";


const CotizarPage = async ():Promise<JSX.Element> => {

    const data = await GetData([process.env.DOMAIN+'/api/delivery'])
    .then(res => res[0] as DeliveryJSON);

    return<>

         <CotizarComponent
            data={data.body[0].data as string}
            typeDelivery={data.body[0].tipo as string}
        />
        <ResponseCotizar
            priceHour={JSON.parse(data.body[0].precio as string).price_x_hour as number}
            priceKm={JSON.parse(data.body[0].precio as string).price_x_km as number}
            priceMayorista={JSON.parse(data.body[0].precio as string).price_x_6 as number}
            theme={JSON.parse(data.body[0].data as string).theme as ThemeProp}
        />

    </> 
}

export default CotizarPage; 