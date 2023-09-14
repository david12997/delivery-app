'use client'
import React, {useEffect} from 'react'
import { useGoogleMaps } from '@/hooks/map.hook';
import { MapProps } from './map.type';
import { useAppDispatch, useAppSelector } from '@/store';
import { setLinkRoute } from '@/store/cotizacion';
import { usePathname } from 'next/navigation';


const Map = (props:MapProps):JSX.Element => {
  
  const Maps = useGoogleMaps(props.apiKey);
  const StateCotizacion = useAppSelector(state => state.cotizacion);
  const dispatch = useAppDispatch();
  const path = usePathname();
  

  useEffect(()=>{
  
    if(Maps.Map === null){
      Maps.RenderMap({geoJson:{
        addGeoJson:true,
        data:{
          url:process.env.NEXT_PUBLIC_DOMAIN+'/cobertura.geojson',
        }
      }});
    }

    
    if(StateCotizacion.en_ejecucion){

      let pointsRoute:any[] = [];

      StateCotizacion.recoger.forEach((item:any) => {
        pointsRoute.push(new google.maps.LatLng(item.location.lat as number ,item.location.lng as number));
      });

      StateCotizacion.entregar.forEach((item:any) =>{
        pointsRoute.push(new google.maps.LatLng(item.location.lat as number ,item.location.lng as number));
      });

      Maps.createRoute({waypoints:pointsRoute},Maps.Map as google.maps.Map);
      
      pointsRoute.forEach((item:any,index:number) =>{
  
        Maps.RenderMap({marker:{
          addMarker:true,
          position:{
            lat:item.lat(),
            lng:item.lng()
          },
          type: index === 0 ? 'recoger' : 'entregar',
          label: StateCotizacion.tipo_entrega !== 'Transporte de personas' ? (index === 0 ? 'Recoger' : index+'. Entregar') : (index === 0 ? 'Origen' : 'Destino'),
          service: StateCotizacion.tipo_entrega,
        
        }});

      });

      Maps.calculateTotalDistanceAndTime({waypoints:pointsRoute},dispatch);
      dispatch(setLinkRoute(Maps.createGoogleMapsLink({waypoints:pointsRoute})));

    } 

    const cobertura = document.querySelector('.cobertura-menu-desktop') as HTMLElement;
    const cotizar = document.querySelector('.cotizar-menu-desktop') as HTMLElement;

    if(path === '/cobertura'){
      
      cobertura.style.color = '#320F75';
      cobertura.style.background = '#ffffff';
      cobertura.style.fontWeight = 'bold';


      cotizar.style.color = '#ffffff';
      cotizar.style.background = '#320F75';


    }

    if(path === '/cotizar'){
      cotizar.style.color = '#320F75';
      cotizar.style.background = '#ffffff';
      cotizar.style.fontWeight = 'bold';

      cobertura.style.color = '#ffffff';
      cobertura.style.background = '#320F75';

     
  
    }

    if(path === '/'){
      cotizar.style.color = '#ffffff';
      cotizar.style.background = '#320F75';
      cobertura.style.color = '#ffffff';
      cobertura.style.background = '#320F75';

  
    }

  
   
  },[StateCotizacion.en_ejecucion,path])



  return<section className="w-screen h-[100vh]">
    <div className='w-[100%] h-[100%]' ref={Maps.MapElementDiv} id='map'></div>
  </section>
}

export default Map