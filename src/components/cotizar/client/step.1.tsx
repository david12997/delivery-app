'use client'
import ButtonImg from '@/components/button.img/button.img';
import React, { useEffect } from 'react';
import { Step1Props } from '../cotizar.type';
import { useAppDispatch } from '@/store';
import { addEntregar, addRecoger, addTipoEntrega } from '@/store/cotizacion';

const Step1Cotizar = (props:Step1Props):JSX.Element =>{

    const dispatch = useAppDispatch();


    useEffect(() => {
        console.log('set recoger and entregar empty');
        dispatch(addRecoger([]))
        dispatch(addEntregar([]));
        dispatch(addTipoEntrega(''))

    }, [])

    return<div className="container-body-step-1 mt-[15px]">
        <div className=" sm:text-[15px] title-step  w-[90%] ml-[5%] h-[45px] flex items-center text-[#7a7a7a] font-bold md:text-[18px]">
            1. Elige el tipo de entrega
        </div>
        <div className="buttons w-[90%] ml-[5%]">
            <ButtonImg
                click={props.una_entrega?.click}
                theme={props.theme}
                label={props.type.uno.label}
                img={props.type.uno.img}
            />

            <ButtonImg
                click={props.multiples_entregas?.click}
                theme={props.theme}
                label={props.type.muchos.label}
                img={props.type.muchos.img}
            />

            <ButtonImg
                click={props.personas?.click}
                theme={props.theme}
                label={props.type.personas.label}
                img={props.type.personas.img}
            />

        </div>
    </div>
}

export default Step1Cotizar;