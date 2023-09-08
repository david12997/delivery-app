'use client'
import Button from '@/components/button/button';
import { NewConversion } from '@/services/new.conversion';
import { useAppSelector } from '@/store';
import React from 'react';
import { ResponseCotizarProps } from '../cotizar.type';
import { io } from "socket.io-client";

const ResponseCotizar = (props:ResponseCotizarProps):JSX.Element =>{

   

    const stateCotizar = useAppSelector(state => state.cotizacion);
    const inputWhatsappRef = React.useRef<HTMLInputElement>(null);

     //convert distance from meters to km
    const convertDistance = (distance:number):string =>{

        const distanceKm = distance/1000;
       return `${ distanceKm.toFixed(1)} Kilometros`

    }

    //convert time from seconds to hours and minutes
    const convertTime = (time:number):string =>{
        
        const hours = Math.floor(time/3600);
        const minutes = Math.floor((time%3600)/60);
        
        return `${hours} h ${minutes} min`
    }

    //calculate price per km and per hour
    const calculatePrice = (distance:number,time:number, quantityEntregas:number):string =>{
        const pricePerKm =  quantityEntregas > 6 ? props.priceMayorista : props.priceKm;
        const pricePerHour = props.priceHour;
    
        const distanceKm = distance/1000;
        const timeHours = time/3600;
        return `$ ${new Intl.NumberFormat('es-CO').format(Math.ceil((distanceKm*pricePerKm) + (timeHours*pricePerHour)))} COP`
         
    }

    return<section className='cotizar-response-screen hidden shadow-[#777777] shadow-sm z-[9] bg-white rounded-md w-[94%] ml-[3%]  md:w-[36%] md:ml-[10px]  fixed bottom-[10px] h-[240px] p-1'>

        <div className="spiner-response-cotizar absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-[#320F75] border-8 h-[160px] w-[160px]"></div>
        </div>

        {
            stateCotizar.response !== null && stateCotizar.response !== undefined
            &&
            <div className="hidden data-response-route p-1 md:p-2 ">
                <div className="w-[100%] h-[30px] font-extrabold  flex items-center justify-center text-[18px] title-response">
                    Cotizacion de {stateCotizar.entregar.length} { stateCotizar.entregar.length > 1 ? ' entregas/transportes' : 'entrega/trasporte'}
                </div>
                <div className="total-distance w-[100%] p-1 font-bold text-[#7f7f7f]">
                    Distancia total: <b className='text-black'> {convertDistance(stateCotizar.response[stateCotizar.response.length-1].distance.value)}</b>
                </div>
                <div className="total-time  w-[100%] p-1 font-bold text-[#7f7f7f]">
                    Tiempo estimado: <b className='text-black'>{convertTime(stateCotizar.response[stateCotizar.response.length-1].duration.value)}</b>
                </div>
                <div className="pagar  w-[100%] p-1  text-[#7f7f7f] font-bold">
                    Total a pagar: <b className='text-[#2a8927] text-[20px]'>{calculatePrice(stateCotizar.response[stateCotizar.response.length-1].distance.value,stateCotizar.response[stateCotizar.response.length-1].duration.value,stateCotizar.entregar.length)}</b>
                </div>
                <Button
                    text='Agendar entrega'
                    bg={props.theme.primary}
                    color={props.theme.white}
                    height='60px'
                    click={()=>{

                        document.querySelector('.data-response-route')?.classList.add('hidden');
                        document.querySelector('.datos-cliente-agendar')?.classList.remove('hidden');
                    }}
                />
            </div>
        }

        {
            stateCotizar.response !== null && stateCotizar.response !== undefined
            &&
            <div className='hidden datos-cliente-agendar w-[100%] p-2'>
                <div className="pagar mb-3  w-[100%]  text-[#7f7f7f] font-bold">
                    Total a pagar: <b className='text-[#2a8927] text-[20px]'>{calculatePrice(stateCotizar.response[stateCotizar.response.length-1].distance.value,stateCotizar.response[stateCotizar.response.length-1].duration.value,stateCotizar.entregar.length)}</b>
                </div>

                <div className="contaier-input-nombre">
                    <label>
                        <span className='text-[16px] font-bold'>Escribe tu Whatsapp</span>  
                    </label>
                    <input ref={inputWhatsappRef}  type="number" className='w-[100%] tex-[18px] h-[50px] p-1 border-[#7f7f7f] border-2 rounded-md mb-2' placeholder=' Ej: 310 421 2121'/>
                    <small className='text-[#808080] font-bold'>En breve tu mensajero se comunicara  contigo</small>
                </div>


                <Button
                    text='Confirmar y agendar'
                    bg={props.theme.primary}
                    color={props.theme.white}
                    height='60px'
                    click={()=>{
                        
                        const whatsapp = inputWhatsappRef.current?.value;
                        if(whatsapp === undefined || whatsapp === null || whatsapp === ''){
                            alert('Debes escribir tu whatsapp');
                            return 0;
                        }else{

                            document.querySelector('.datos-cliente-agendar')?.classList.add('hidden');
                            document.querySelector('.spiner-response-cotizar')?.classList.remove('hidden');

                            const Conversion ={
                                ...stateCotizar,
                                precio:calculatePrice(stateCotizar.response[stateCotizar.response.length-1].distance.value,stateCotizar.response[stateCotizar.response.length-1].duration.value,stateCotizar.entregar.length),
                                precio_km:props.priceKm,
                                precio_hora:props.priceHour,
                                precio_mayorista:props.priceMayorista,
                                convertDistance:convertDistance(stateCotizar.response[stateCotizar.response.length-1].distance.value),
                                convertTime:convertTime(stateCotizar.response[stateCotizar.response.length-1].duration.value),
                                date: new Date().toLocaleDateString(),
                                whatsapp:whatsapp,
                            
                            }
                            NewConversion(Conversion)
                            .then(res =>{
                                if(res.status === 200){
                                    
                                    document.querySelector('.spiner-response-cotizar')?.classList.add('hidden');
                                    document.querySelector('.success-conversion')?.classList.remove('hidden');
                                    console.log('agendamiento exitoso');
                                    // send notification to conductor via socket
                                    const socket = io('http://localhost:3001');
                                    socket.on('connect', () => {
                                        console.log('conectado al servidor');
                                        socket.emit('new_service', JSON.stringify({status:'update services',data:Conversion}));
                                    });

                                }else{
                                    document.querySelector('.spiner-response-cotizar')?.classList.add('hidden');
                                    document.querySelector('.failed-conversion')?.classList.remove('hidden');
                                }
                            })
                            .catch(err => console.log(err));
                        }


                    }}
                   
                
                />
            </div>
        }

        <div className='hidden p-1 md:p-2 success-conversion    w-[100%]  text-[#7f7f7f] font-bold text-[16px]'>
            <h2 className=' mb-3  w-[100%]  text-[#000000] font-bold text-[18px]'> ¡ Agendamiento exitoso !</h2>
            <p>En breve recibiras un mensaje de whatsapp</p>
            <p>por parte del domiciliario</p>
            <Button
                text='Aceptar Y salir'
                bg={props.theme.primary}
                color={props.theme.white}
                height='60px'
                click={()=>{ window.location.href = '/'; }}
            />
        </div>

        <div className='hidden p-1 md:p-2 failed-conversion'>
            <h2 className=' mb-3  w-[100%]  text-[#7f7f7f] font-bold text-[18px]'> ¡ Ups no pudimos agendar tu entrega !</h2>
            <p>Por favor intentalo mas tarde</p>
            <Button
                text='Aceptar Y salir'
                bg={props.theme.primary}
                color={props.theme.white}
                height='60px'
                click={()=>{ window.location.href = '/'; }}
            />
           
        </div>




    </section>
}

export default ResponseCotizar;