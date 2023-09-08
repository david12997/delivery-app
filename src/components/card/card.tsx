'use client'

import { ThemeProp } from "../nav/nav.type";

const Card = (props:{theme:ThemeProp,date:string,linkGmaps:string,convertTime:string,convertDistance:string,price:string,entregar:any[],recoger:any[],response:any[],whatsapp:string,typeDeliver:string}):JSX.Element => {


    return<>
    <div className="relative card card-side bg-base-100 shadow-xl w-[100%] h-[88vh]  md:h-[86vh] mt-2 mb-[30px]">
    
        <div className=" p-4 w-[100%]  overflow-y-scroll mb-2">

            <div className="card-actions flex items-center justify-center">
                <button style={{background:'#0a8f00',color:'white',border:'1px solid #0a8f00'}} className="btn btn-primary w-[100%] md:w-[48%] font-blod text-white">Aceptar servicio</button>
                <button className="btn  w-[100%]  md:w-[48%] font-bold">Pasar servicio</button>
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