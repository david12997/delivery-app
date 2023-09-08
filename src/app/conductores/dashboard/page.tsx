export const dynamic = 'force-dynamic'

import { DeliveryJSON } from "@/app/api/delivery/delivery.type";
import Card from "@/components/card/card";
import Navbar from "@/components/nav/nav";
import { GetData } from "@/services/get.data";
import SectionCards from "./section.cards";



const AdminPage = async ():Promise<JSX.Element> => {



    const data = await GetData([process.env.DOMAIN+'/api/delivery'])
    .then(res => res[0] as DeliveryJSON);
  
    return<section style={{background:JSON.parse(data.body[0].data as string).theme.gray}} className="admin-dashboard">
        <Navbar
            logo={JSON.parse(data.body[0].media).img.logo}
            name={JSON.parse(data.body[0].data as string).name}
            items={JSON.parse(data.body[0].data as string).items}
            social={JSON.parse(data.body[0].data as string).social}
            theme={JSON.parse(data.body[0].data as string).theme}
            admin={true}
        />
        <SectionCards
            theme={JSON.parse(data.body[0].data as string).theme}
            apiKeyMaps={JSON.parse(data.body[0].data as string).apiKeyMaps}
        />  

       

    </section> 
}

export default AdminPage; 