export const dynamic = 'force-dynamic'

import { GetData } from "@/services/get.data"
import { DeliveryJSON } from "./api/delivery/delivery.type";
import HomeComponent from "@/components/home/home";


const HomePage = async ():Promise<JSX.Element> => {

  const data = await GetData([process.env.DOMAIN+'/api/delivery'])
  .then(res => res[0] as DeliveryJSON);

  return<>

    <HomeComponent
      dataBrand={data.body[0].data as string}
    />

  </>
}

export default HomePage; 