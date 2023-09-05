'use client'
import React, { useEffect, useState} from 'react';
import { Step2Props } from '../cotizar.type';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store';
import Button from '@/components/button/button';
import Trash from '@/icons/trash';
import { addEntregar } from '@/store/cotizacion';


const Step2Cotizar = (props:Step2Props):JSX.Element =>{

    const dispatch = useAppDispatch();
    const RecogerState = useAppSelector(state => state.cotizacion.recoger);
    const EntregarState = useAppSelector(state => state.cotizacion.entregar);
    const [typeCotizar, setTypeCotizar] = useState<string>('recoger');

    const styleRecogerEntregar ={
        selected:{
            background:props.theme.primary,
            color:props.theme.white
        },
        unselected:{
            background:props.theme.gray,
            color:props.theme.gray_dark
        }
    }

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

    const clearInput = ():void =>{
        let input =  props.autocomplete.inputElement.current as HTMLInputElement;
        input.value = '';
        input.focus();
    }

    useEffect(() => {
        props.autocomplete.InputPlaceAutocomplete({},dispatch,RecogerState,EntregarState,typeCotizar, props.title);
    }, [typeCotizar, EntregarState]);

    return<div className="container-body-step-2 mt-[15px] overflow-y-scroll">

        <div className=" sm:text-[15px]  title-step  w-[90%] ml-[5%] h-[45px] flex items-center text-[#7a7a7a] font-bold md:text-[18px]">
            2. Escribe  {props.title === 'Transporte de personas' ? 'tu Origen - Destino' : 'donde Recoger - Entregar'}
        </div>

        <div className='mt-2 ml-[5%] w-[90%] h-[50px] flex items-center justify-between'>

            <div style={ typeCotizar === 'recoger' ? styleRecogerEntregar.selected : styleRecogerEntregar.unselected} 
                className="cursor-pointer text-[17px] recoger w-[160px] h-[50px] relative flex rounded-md justify-around items-center font-bold"
                onClick={() =>{
                    clearInput();
                    setTypeCotizar('recoger');
                
                }}
            >
               {props.title === 'Transporte de personas' ? 'Origen' : 'Recoger'}
                <Image
                    src={props.title === 'Transporte de personas' ? 'https://cms.skycode.me/skycode/assets/564g5q8o2sw8oogc':'https://cms.skycode.me/skycode/assets/b2vk3lyh21skg84w'}
                    alt='recoger'
                    width={45}
                    height={45}
                />
            </div>
            <div style={typeCotizar === 'entregar' ? styleRecogerEntregar.selected : styleRecogerEntregar.unselected} 
                className="cursor-pointer text-[17px] entregar w-[160px] h-[50px] relative flex rounded-md justify-around items-center font-bold"
                onClick={() =>{
                    clearInput();   
                    setTypeCotizar('entregar')
                }}
            >
                {props.title === 'Transporte de personas' ? 'Destino' : 'Entregar'}
                <Image
                    src={props.title === 'Transporte de personas' ? 'https://cms.skycode.me/skycode/assets/1pwf0vzwbz1cgoo8':'https://cms.skycode.me/skycode/assets/q5dusdn2j00o8gss'} 
                    alt='entregar'
                    width={45}
                    height={45}
                />
            </div>
        </div>

        <div className='body-step2 w-[90%] ml-[5%] h-[30vh]'>
            <div className='input-recoger  w-[100%] mt-[30px]'>

                <label style={{color:props.theme.primary}} htmlFor='recoger' className='w-[100%] font-bold text-[17px]'>
                   { props.title !== 'Transporte de personas' ? (typeCotizar === 'recoger' ? 'Dirección de recogida' : 'Dirección de entrega') : (typeCotizar === 'recoger' ? 'Dirección de origen' : 'Dirección de destino') } 
                </label>
                <input 
                    ref={props.autocomplete.inputElement}
                    className='font-normal text-[20px] w-[100%] h-[60px] shadow-sm shadow-[#c6c6c6] rounded-xl mt-1 mb-1 border boder-[#c6c6c6]' 
                    type="text" 
                    name="recoger" 
                    id="recoger" 
                    placeholder={props.title !== 'Transporte de personas' ? (typeCotizar === 'recoger' ? ' Escribe la dirección de recogida' : ' Escribe la dirección de entrega'):(typeCotizar === 'recoger' ? ' Escribe la dirección de origen' : ' Escribe la dirección de destino')}
                    onClick={()=>  props.autocomplete.InputPlaceAutocomplete({},dispatch,RecogerState,EntregarState, typeCotizar, props.title)}
                />
            </div>
            {
                (typeCotizar === 'entregar' && props.title === 'Multiples entregas')
                &&
                <div className='w-[260px] h-[45px]'>
                    <Button
                        text='Agregar otra entrega'
                        bg={props.theme.gray
                        }
                        color={props.theme.gray_dark}
                        height='45px'
                        click={clearInput}
                        
                    />
                </div>
            }

        </div>

        {
            (props.title === 'Una sola entrega' || props.title === 'Transporte de personas' || typeCotizar === 'recoger')
            ?
            <div className='p-2 flex  items-center direction-selected w-[90%] ml-[5%] h-[60px] absolute  bottom-[90px]'>
                <div className='text-[16px] font-extrabold text-[#7e7e7e]'>
                    <span className='mr-2'>{typeCotizar === 'recoger' ? 'Recoger en:  ' : 'Entregar en:  '}</span>
                    { (typeCotizar === 'recoger' && RecogerState.length !== 0) &&  RecogerState[0].direccion}
                    { (typeCotizar === 'entregar' && EntregarState.length !== 0) &&  EntregarState[EntregarState.length-1].direccion}
                </div>
            </div>
            :
            <div className='bg-white  p-2 block  direction-selected w-[90%] ml-[5%] h-[96px] absolute  bottom-[89px] overflow-y-scroll'>
                <div className='text-[16px] font-extrabold text-[#7e7e7e]'>
                    Entregar En:
                </div>
                {
                    EntregarState.length !== 0 && EntregarState.map((item,index) =><div key={index} className='w-[100%] flex items-center justify-center h-[35px]'>
                        <div className='w-[10%] cursor-pointer' onClick={()=>{
                            clearInput();
                            dispatch(addEntregar(EntregarState.filter((item2,index2) => index2 !== index && item2)));
                        }}>
                            <Trash
                                width={20}
                                height={20}
                                fill='#c70000'
                            />
                        </div>
                        <div key={index} className='w-[75%] truncate text-ellipsis overflow-hidden text-[16px] font-extrabold text-[#7e7e7e]'>
                           {index+1}.{' '+item.direccion}
                        </div>
                    </div>)
                }


            </div>
        }


        <div style={RecogerState.length === 0 || EntregarState.length === 0 ? styleSiguiente.locked : styleSiguiente.unlocked} 
            className="cursor-pointer  shadow-sm shadow-[#878787] rounded-md text-[18px] font-bold  bottom-[20px] flex items-center justify-center  button-next-step absolute  w-[90%] ml-[5%] h-[60px]"
            onClick={() =>{
                (RecogerState.length !== 0 && EntregarState.length !== 0) 
                &&
                props.clickNext(); 
            }}
        >
            
            Siguiente
        </div>

    </div>
}

export default Step2Cotizar;