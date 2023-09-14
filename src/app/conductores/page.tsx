export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
import { GetData } from "@/services/get.data";
import { DeliveryJSON } from "../api/delivery/delivery.type";
import { ThemeProp } from "@/components/nav/nav.type";
import Login from "@/components/login/login";


const ConductoresPage = async ():Promise<JSX.Element> => {

    const data = await GetData([process.env.DOMAIN+'/api/delivery'])
    .then(res => res[0] as DeliveryJSON);

    const theme:ThemeProp = JSON.parse(data.body[0].data as string).theme;

    return<>

        <section style={{background:theme.gray}} className="w-screen h-[100vh] flex items-center justify-center ">
            <Login theme={JSON.parse(data.body[0].data as string).theme} />
        </section>

    </> 
}

export default ConductoresPage; 