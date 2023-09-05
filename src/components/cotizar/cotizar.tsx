'use client'
import React, {createContext, useEffect, useState} from "react";
import CloseTimes from "@/icons/close-times";
import { ContextCotizadorProps, CotizarProps } from "./cotizar.type";
import StepsCotizar from "./client/steps";
import Link from "next/link";
import Arrow2 from "@/icons/arro.2";
import { useAppDispatch, useAppSelector } from "@/store";
import { addTipoEntrega } from "@/store/cotizacion";


export const ThemeContextCotizador = createContext< ContextCotizadorProps | null>(null);

const CotizarComponent = (props:CotizarProps):JSX.Element => {

    const dispatch = useAppDispatch();
    const TypeDeliveryState = useAppSelector(state => state.cotizacion.tipo_entrega);
    const typeDelivery =JSON.parse(props.typeDelivery);
    const data = JSON.parse(props.data);

    const step1Context:ContextCotizadorProps = {
        currentVisible:'step1',
        title:"Tipo de entrega",
        text_step:"1. Elige el tipo de entrega",
        nextVisible:'step2',
    }

    const [step, setStep] = useState<ContextCotizadorProps>(step1Context);
    const PreviousStep = ()=>{

        step.currentVisible === 'step2' && setStep({
            currentVisible:'step1',
            title:"Tipo de entrega",
            text_step:"1. Elige el tipo de entrega",
            nextVisible:'step2',
        });

        step.currentVisible === 'step3' && setStep({
            currentVisible:'step2',
            title:TypeDeliveryState,
            text_step:"2. Escribe donde Recoger/Entregar",
            nextVisible:'step3',
        });
    }

    useEffect(() => {

        document.querySelector('.cotizador')?.classList.remove('hidden');
        document.querySelector('.cotizador')?.classList.add('block');

    }, [])

    return<ThemeContextCotizador.Provider value={step}>
        <div className="z-[999] top-[0px] cotizador  shadow-md shadow-[#9c9c9c]  w-screen  md:w-[600px] h-[100vh] bg-white">

            <div className="w-[100%] h-[50px] flex items-center">
                <Link href={'/'} className={`cursor-pointer icon-close-cotizar p-2 pl-3 ${step.currentVisible !== "step1" && "hidden" }`}>
                    <CloseTimes width={20} height={20} fill={data.theme.primary} />
                </Link>
                <div onClick={PreviousStep} className={`cursor-pointer icon-previous-cotizar p-2 pl-3 ${step.currentVisible === "step1" && "hidden" }`}>
                    <Arrow2 width={22} height={22} fill={data.theme.primary} />
                </div>
                <div className="title-cotizar-state absolute left-[35%] text-[18px] text-black font-bold">
                    {step.title}
                </div>
            </div>

            <hr className="w-[90%] ml-[5%]" />



            <StepsCotizar
                data={data}
                step1={{
                    theme:data.theme,
                    type:{
                        uno:{
                            label:typeDelivery.una_entrega.button.label,
                            img:typeDelivery.una_entrega.button.img
                        },
                        muchos:{
                            label:typeDelivery.multiples_entregas.button.label,
                            img:typeDelivery.multiples_entregas.button.img
                        },
                        personas:{
                            label:typeDelivery.transporte_personas.button.label,
                            img:typeDelivery.transporte_personas.button.img
                        }
                    },
                    una_entrega:{
                        click:()=>{
                            setStep({
                                currentVisible:'step2',
                                title:"Una sola entrega",
                                text_step:"2. Escribe donde Recoger/Entregar",
                                nextVisible:'step3',
                            });
                            dispatch(addTipoEntrega('Una sola entrega'));

                        }
                    },
                    multiples_entregas:{
                        click:()=>{
                            setStep({
                                currentVisible:'step2',
                                title:"Multiples entregas",
                                text_step:"2. Escribe donde Recoger/Entregar",
                                nextVisible:'step3',
                            });
                            dispatch(addTipoEntrega('Multiples entregas'));
                        }
                    },
                    personas:{
                        click:()=>{
                            setStep({
                                currentVisible:'step2',
                                title:"Transporte de personas",
                                text_step:"2. Escribe donde Recoger/Entregar",
                                nextVisible:'step3',
                            });
                            dispatch(addTipoEntrega('Transporte de personas'));
                        }
                    }


                }}

                step2={{
                    click:()=>{
                        setStep({
                            currentVisible:'step3',
                            title:"Crear ruta y cotizar",
                            text_step:"3. Aceptar y cotizar",
                            nextVisible:'',
                        })
                    }
                }}
                
            />


        </div>
    </ThemeContextCotizador.Provider>
    

}

export default CotizarComponent;