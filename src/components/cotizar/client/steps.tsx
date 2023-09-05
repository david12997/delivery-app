'use client'
import React, {useContext,} from 'react';
import { ContextCotizadorProps, StepsProps } from '../cotizar.type';
import Step1Cotizar from './step.1';
import { ThemeContextCotizador } from '../cotizar';
import Step2Cotizar from './step.2';
import Step3Cotizar from './step.3';
import { useGoogleMaps } from '@/hooks/map.hook';

const StepsCotizar = (props:StepsProps):JSX.Element =>{

    const autocomplete = useGoogleMaps(props.data.apiKeyMaps);
    const dataContextCotizador = useContext<any>(ThemeContextCotizador) as ContextCotizadorProps;

    const styleCircleStepActive ={
        background:props.data.theme.primary,
        color:props.data.theme.white
    }

    const styleCircleStepInactive ={
        background:props.data.theme.gray,
        color:props.data.theme.gray_dark
    }


    return<section>            
        <div className="steps-container w-[100%] h-[50px] flex items-center justify-around mt-[15px]">
            
            <div style={dataContextCotizador.currentVisible === 'step1' ? styleCircleStepActive : styleCircleStepInactive} 
                className="step rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-[17px] font-bold"
            >
                1
            </div>
            <div style={dataContextCotizador.currentVisible === 'step2' ? styleCircleStepActive : styleCircleStepInactive} 
                className="step rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-[17px] font-bold"
            >
                2
            </div>
            <div style={dataContextCotizador.currentVisible === 'step3' ? styleCircleStepActive : styleCircleStepInactive} 
                className="step rounded-[50%] w-[40px] h-[40px] flex items-center justify-center text-[17px] font-bold"
            >
                3
            </div>
        </div>
        {
            dataContextCotizador.currentVisible === 'step1' 
            ?
            <Step1Cotizar
                una_entrega={props.step1.una_entrega}
                multiples_entregas={props.step1.multiples_entregas}
                theme={props.step1.theme}
                type={props.step1.type}
                personas={props.step1.personas}
            />
            :
            dataContextCotizador.currentVisible === 'step2'
            ?
            <Step2Cotizar
                theme={props.step1.theme}
                autocomplete={autocomplete}
                title={dataContextCotizador.title}
                clickNext={props.step2.click}

            
            />
            :
            <Step3Cotizar
                title={dataContextCotizador.text_step}
                terminos={props.data.terminos}
                theme={props.step1.theme}
            />
        }

    </section>

}

export default StepsCotizar;