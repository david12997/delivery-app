import { GetData } from "@/services/get.data"
import { DeliveryJSON } from "../api/delivery/delivery.type";

import CreateCalendar from "@/components/calendar/calendar";



const CalendarioPage = async ():Promise<JSX.Element> => {

    const data = await GetData([process.env.DOMAIN+'/api/delivery'])
    .then(res => res[0] as DeliveryJSON);

    return<section className="shadow shadow-[#515151] rounded-md p-[10px] md:p-[20px] absolute top-[100px] w-sceen md:w-[50vw] md:ml-[25vw] bg-white h-[70vh] overflow-y-scroll">
        <CreateCalendar/>
    </section> 
}

export default CalendarioPage; 