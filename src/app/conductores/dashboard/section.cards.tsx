'use client'

import Card from "@/components/card/card"
import { ThemeProp } from "@/components/nav/nav.type"
import { GetConversion } from "@/services/get.conversion";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SectionCards = (props:{theme:ThemeProp,apiKeyMaps:string}):JSX.Element => {

    const socket = io('http://localhost:3001');

    const [newService,setNewService] = useState<string>('init');
    const [dataService,setDataService] = useState<any>([]);


    useEffect(() => {

        GetConversion([process.env.NEXT_PUBLIC_DOMAIN as string + '/api/conversion'],'1')
        .then((res) => {
            if(res[0].length > 0){

                setNewService('first render');
                setDataService(res[0]);
                console.log(res[0]);
            }else{
                setNewService('init');
            }
        })
        .catch((err) => {
            console.log(err);
        });

        socket.on('connect', () => {
          
            socket.on('service', (data) => {
                console.log(data);
                setNewService('new service');

            });

        });

        return () => {
            socket.off('connect');
            socket.off('service');
        }

    },[newService]);

    return<>
        <section  className=" w-[100%] h-[96vh] relative  flex items-center  justify-center overflow-y-scroll">
            <div className="services-container w-[90%] md:w-[50%] h-[90vh] ">
                {
                    newService === 'first render' || newService === 'new service'
                    ?
                    dataService.map((item:any,index:number) => {

                        const dataService = JSON.parse(item.data_service);
                        const dataState = JSON.parse(item.data_state);


                        return<span key={index}>
                            <Card 
                                theme={props.theme}
                                date={dataService.date}
                                linkGmaps={dataService.link_route}
                                convertTime={dataService.convertTime}
                                convertDistance={dataService.convertDistance}
                                price={dataService.precio}
                                entregar={dataService.entregar}
                                recoger={dataService.recoger}
                                response={dataService.response}
                                whatsapp={dataService.whatsapp}
                                typeDeliver={dataService.tipo_entrega}

                            />
                            <hr className="mt-4 mb-6"/>
                        </span>
                    
                    })
                    :
                    <div style={{color:props.theme.primary}} className="text-[25px] bg-white rounded-lg p-9 flex items-center justify-center font-bold">
                        No tienes servicios pendientes
                    </div>


                }

                <br/>
                <br/>
            </div>
        </section>
    </>

}

export default SectionCards;