export const dynamic = 'force-dynamic'

import { GetData } from "@/services/get.data"
import { DeliveryJSON } from "./api/delivery/delivery.type";
import HomeComponent from "@/components/home/home";
import Map from "@/components/map/map";
import Navbar from "@/components/nav/nav";


const HomePage = async ():Promise<JSX.Element> => {

  const data = await GetData([process.env.DOMAIN+'/api/delivery'])
  .then(res => res[0] as DeliveryJSON);

  return<>
    <Navbar
      logo={JSON.parse(data.body[0].media).img.logo}
      name={JSON.parse(data.body[0].data as string).name}
      items={JSON.parse(data.body[0].data as string).items}
      social={JSON.parse(data.body[0].data as string).social}
      theme={JSON.parse(data.body[0].data as string).theme}
      admin={false}
    />
    <Map 
      apiKey={JSON.parse(data.body[0].data as string).apiKeyMaps}  
    />
    <HomeComponent
      dataBrand={data.body[0].data as string}
    />

  </>
}

export default HomePage; 