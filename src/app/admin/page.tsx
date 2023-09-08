export const dynamic = 'force-dynamic'

import { GetData } from "@/services/get.data";
import { DeliveryJSON } from "../api/delivery/delivery.type";
import LoginAdmin from "@/components/login/login";
import { ThemeProp } from "@/components/nav/nav.type";



const AdminPage = async ():Promise<JSX.Element> => {

    const data = await GetData([process.env.DOMAIN+'/api/delivery'])
    .then(res => res[0] as DeliveryJSON);

    const theme:ThemeProp = JSON.parse(data.body[0].data as string).theme;

    return<>

        <section style={{background:theme.gray}} className="w-screen h-[100vh] flex items-center justify-center">
            <LoginAdmin theme={JSON.parse(data.body[0].data as string).theme} />
        </section>

    </> 
}

export default AdminPage; 