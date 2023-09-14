'use client'

import { ResolveConversion } from "@/services/resolve.conversion";
import { ThemeProp } from "../nav/nav.type";

const Card = (props:{theme:ThemeProp, setNewService:any,idConversion:number, date:string,linkGmaps:string,convertTime:string,convertDistance:string,price:string,entregar:any[],recoger:any[],response:any[],whatsapp:string,typeDeliver:string}):JSX.Element => {

    const handleAcceptService = ():void => {

        ResolveConversion([process.env.NEXT_PUBLIC_DOMAIN as string + '/api/resolve-conversion'],'success',props.idConversion)
        .then((res) => {

            alert('Servicio aceptado con exito');
            props.setNewService('new service');

        })
        .catch((err) => {
            console.error(err);
            alert('Error al aceptar el servicio, intentalo de nuevo');

        });

        //send message to a client via whatsapp
        const message = `Hola, soy tu 🛵 Mensajero Doomis y estoy en camino a recoger tu pedido en 👉 ${props.recoger[0].direccion} \n\n DATOS COTIZACIÓN 📝👇\n\n ⏰Tiempo estimado: ${props.convertTime}\n\n 🟣Distancia: ${props.convertDistance} \n\n 💸Valor: ${props.price} \n\n 🛣 Ruta de cotizacion: ${props.linkGmaps} \n\n 📲Recuerda que puedes contactarme por este medio`
        const messageEncoded = encodeURIComponent(message)
        window.open(`https://api.whatsapp.com/send?phone=57${props.whatsapp}&text=${messageEncoded}`,'_blank')
    }

    const handlePassService = ():void => {
        
        ResolveConversion([process.env.NEXT_PUBLIC_DOMAIN as string + '/api/resolve-conversion'],'failed',props.idConversion)
        .then((res) => {

            alert('Servicio pasado con exito');
            props.setNewService('new service');

        })
        .catch((err) => {
            console.error(err);
            alert('Error al pasar el servicio, intentalo de nuevo');

        });

        //send message to a client via whatsapp
        const message = `Hola, soy tu 🛵Mensajero Doomis TENGO DISPONIBILIDAD DENTRO DE 🔴 2 HORAS 🔴 PARA RECOGER TU ENTREGA EN 👉 ${props.recoger[0].direccion}  \n\n DATOS COTIZACIÓN📝👇 \n\n ⏰Tiempo estimado: ${props.convertTime}\n\n 🟣Distancia: ${props.convertDistance} \n\n 💸Valor: ${props.price} \n\n 🛣Ruta de cotizacion: ${props.linkGmaps} \n\n 📲 SI EL TIEMPO DE ESPERA 🔴 2 HORAS 🔴 SE AJUSTA A TU ENTREGA MARCA 1⃣ PARA CONFIRMAR EL SERVICIO  `
        const messageEncoded = encodeURIComponent(message)
        window.open(`https://api.whatsapp.com/send?phone=57${props.whatsapp}&text=${messageEncoded}`,'_blank')
    }

    return<>
    <div className="relative card card-side bg-base-100 shadow-xl w-[100%] h-[88vh]  md:h-[86vh] mt-2 mb-[30px]">
    
        <div className=" p-4 w-[100%]  overflow-y-scroll mb-2">

            <div className="card-actions flex items-center justify-center">
                <button onClick={handleAcceptService} style={{background:'#0a8f00',color:'white',border:'1px solid #0a8f00'}} className="btn btn-primary w-[100%] md:w-[48%] font-blod text-white">Aceptar servicio</button>
                <button onClick={handlePassService} className="btn  w-[100%]  md:w-[48%] font-bold">Pasar servicio</button>
            </div>
            <h2 className="card-title font-extrabold  text-[18px] flex justify-center items-center p-2"> {props.typeDeliver}</h2>
            <hr className="mt-1 mb-1"/>
            <div className="text-[15px] font-extrabold">
               <div className="w-[100%]"> Recoger en:</div> 
               {props.recoger.map((item:any,index:number) =><div key={index} className="w-[100%]">{item.direccion}</div>)}
            </div>
            <hr className="mt-1 mb-1"/>
            <div className="text-[15px] font-extrabold overflow-y-scroll  min-h-[85px] max-h-[90px]">
                <div className="w-[100%]">Entregar en en:</div> 
                {props.entregar.map((item:any,index:number) =><div key={index} className="w-[100%]">{index+1}.  {item.direccion}</div>)}
            </div>
            <hr className="mt-1 mb-1"/>
            <h2 className="card-title font-extrabold text-[#0a8f00] text-[22px]">Ganas: {props.price}</h2>
            <hr className="mt-1 mb-1"/>
            <div className="text-[15px] font-extrabold">Distancia : {props.convertDistance}</div>
            <div className="text-[15px] font-extrabold">Tiempo : {props.convertTime}</div>
            <div className="text-[15px] font-extrabold">Agendado el: {props.date}</div>
            <div className="text-[15px] font-extrabold">Telefono Cliente: {props.whatsapp}</div>
            <button style={{background:props.theme.primary,color:'white'}} onClick={()=>window.open(props.linkGmaps,'_blank')} className="absolute bottom-[15px] btn btn-neutral-content  w-[90%]  md:w-[95%]">Abrir en Google Maps</button>
        </div>
    </div>
    </>
}

export default Card;