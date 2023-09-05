'use client'
import { ThemeProp } from '@/components/nav/nav.type';
import { useAppDispatch } from '@/store';
import { setEnEjecucion } from '@/store/cotizacion';
import React  from 'react';


const Step3Cotizar = (props:{title:string,terminos:any,theme:ThemeProp}):JSX.Element =>{

    const dispatch = useAppDispatch();

    
    const styleSiguiente ={
        locked:{
            background:props.theme.gray,
            color:props.theme.gray_dark
        },
        unlocked:{
            background:'#5a8302',
            color:props.theme.white
        }
    }

    return<div className="container-body-step-1 mt-[15px]">
        <div className="title-step  sm:text-[15px]  w-[90%] ml-[5%] h-[45px] flex items-center text-[#7a7a7a] font-bold md:text-[18px]">
            {props.title}
        </div>

        <div className='w-[90%] ml-[5%] mt-2 mb-2 h-[30px]'>
            <li style={{color:props.theme.primary}} className='font-bold sm:text-[16px] md:text-[18px]'>Condiciones y restricciones</li>
        </div>
        <div className="w-[90%] ml-[5%] text-[#7a7a7a] font-bold md:text-[18px]">
            {
                props.terminos.condiciones.map((item:string,index:number) =>{
                    return<div key={index} className="block w-[100%]">
                        <div className='flex items-center'>
                            {index+1}. {item}
                        </div>
                    </div>
                })
            }
        </div>

        <div className='w-[90%] ml-[5%] mt-6  mb-2 h-[30px]'>
            <li style={{color:props.theme.primary}} className='font-bold sm:text-[16px] md:text-[18px]'>Adicionales</li>
        </div>
        <div className="w-[90%] ml-[5%] h-[45px] text-[#7a7a7a] font-bold md:text-[18px]">
            {
                props.terminos.adicionales.map((item:string,index:number) =>{
                    return<div key={index} className="block w-[100%]">
                        <div className='flex items-center'>
                            {index+1}. {item}
                        </div>
                    </div>
                })
            }
        </div>

        <div style={styleSiguiente.unlocked} 
            className="cursor-pointer  shadow-sm shadow-[#878787] rounded-md text-[18px] font-bold  bottom-[20px] flex items-center justify-center  button-next-step absolute  w-[90%] ml-[5%] h-[60px]"
            onClick={()=>{
                document.querySelector('.cotizar-response-screen')?.classList.remove('hidden');
                setTimeout(()=>{
                    document.querySelector('.spiner-response-cotizar')?.classList.add('hidden'); 
                    document.querySelector('.data-response-route')?.classList.remove('hidden');
                },1000);
               
                dispatch(setEnEjecucion(true));
                document.querySelector('.cotizador')?.classList.remove('block');
                document.querySelector('.cotizador')?.classList.add('hidden');
                setTimeout(()=>{
                    dispatch(setEnEjecucion(false));
                },2000);
            }}
        >
            Cotizar entrega
        </div>
    </div>
}

export default Step3Cotizar;