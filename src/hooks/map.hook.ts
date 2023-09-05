import { GetData } from "@/services/get.data";
import { addRecoger, addEntregar, setResponse } from "@/store/cotizacion";
import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useState } from "react";


export const useGoogleMaps = (apiKey:string) => {

    // load google maps api
    const googleMapsLoader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places"]
    });

    const MapElementDiv = useRef<HTMLDivElement | null>(null); // div element to render map
    const [Map, setMap] = useState<google.maps.Map | null>(null); // map instance
    const [Markers, setMarkers] = useState<google.maps.Marker[] | null>(null); // markers array

    const inputElement = useRef<HTMLInputElement | null>(null); // input element to search places with suggestions
    const [inputAutocompleteInstance, setInputAutocompleteInstance] = useState<google.maps.places.Autocomplete | null>(null); // map instance

    // initial map options
    const initialOptions = {

        center: {
            lat: 4.648444872577107, 
            lng: -74.11874117495658
        },
        zoom: 12,
        disableDefaultUI: true,
        mapTypeControl: false,
        fullscreenControl: false,
        panControl: false,
        streetViewControl:false,
        zoomControl:false,
        rotateControl:false,
        scaleControl:false,

    } as google.maps.MapOptions;

    // render map on first load
    const RenderMap = (config:any)=>{

        googleMapsLoader
        .load()
        .then((google) => {

            // render map first time
            if(Map === null && MapElementDiv.current !== null){
            
                let map = new google.maps.Map(MapElementDiv.current, initialOptions);
                setMap(map);

                //add geoJson layer to map
                if(config.geoJson !== undefined && config.geoJson.addGeoJson){
                    addGeoJSONLayer(config.geoJson.data,map);
                }

                // add marker to map
                if( config.marker !== undefined && config.marker.addMarker){
    
                    addMarker(config,map);
                    }
                 
            }

            // update map when this already exists
            if(Map !== null && MapElementDiv.current !== null){

                // add marker to map
                if( config.marker !== undefined && config.marker.addMarker){
                    
                   addMarker(config,Map);
                }

                //add geoJson layer to map
                if(config.geoJson !== undefined && config.geoJson.addGeoJson){
                    addGeoJSONLayer(config.geoJson.data,Map);
                }
                

            }

            
        })
        .catch((e) => console.error(e) );


    }

    //Add marker to map
    const addMarker = (config:any, mapInstance:google.maps.Map)=>{
        let urlIcon:string;
        if(config.marker.service !== 'Transporte de personas'){
            urlIcon = config.marker.type === 'recoger' ? 'https://cms.skycode.me/skycode/assets/b2vk3lyh21skg84w' : 'https://cms.skycode.me/skycode/assets/q5dusdn2j00o8gss'
        }else{
            urlIcon = config.marker.type === 'recoger' ? 'https://cms.skycode.me/skycode/assets/564g5q8o2sw8oogc' : 'https://cms.skycode.me/skycode/assets/1pwf0vzwbz1cgoo8'

        } 
        let newMarker  = new google.maps.Marker({
            position: config.marker.position,
            map: mapInstance,
            icon: {
                url:urlIcon ,
                scaledSize: new google.maps.Size(60, 60)
            },
            label: {
                text: config.marker.label,
                className: "label-marker-gmaps bg-white font-bold p-2 w-[120px] h-[40px] rounded-xl flex justify-center items-center shadow-md overflow-ellipsis truncate "
            }

        });
        newMarker.setMap(mapInstance);

        // add marker to markers array
        if(Markers !== null){
            setMarkers([...Markers,newMarker]);
        }else{
            setMarkers([newMarker]);
        }
    }

    // input place autocomplete
    const InputPlaceAutocomplete = (config:any,dispatch:any, stateRecoger:any, stateEntrgar:any, typeCotizar:string,typeEntrega:string)=>{
        googleMapsLoader
        .load()
        .then((google) => {

            // google maps autocomplete instance 
            if( inputElement !== null && inputElement.current !== null){

                let autocomplete = new google.maps.places.Autocomplete(inputElement.current, {
                    fields: ["formatted_address", "geometry", "name"],
                    componentRestrictions: {country: "co"}
                });

                setInputAutocompleteInstance(autocomplete);

                autocomplete.addListener("place_changed", () => {

                    let place = autocomplete.getPlace();
                    if(place.geometry !== undefined && place.formatted_address !== undefined){
                       
                        place.geometry.location !== undefined && typeCotizar === 'recoger'
                        &&
                        dispatch(addRecoger([{
                            direccion:place.formatted_address,
                            location:{
                                lat:place.geometry.location.lat(),
                                lng:place.geometry.location.lng(),
                            }
                            
                        }]));


                        if(place.geometry.location !== undefined && typeCotizar === 'entregar'){

                            let newEntregar:any[] = [];

                            if(typeEntrega === 'Una sola entrega' || typeEntrega === 'Transporte de personas'){
                                
                                dispatch(addEntregar([]));
                                newEntregar = [{
                                    direccion:place.formatted_address,
                                    location:{
                                        lat:place.geometry.location.lat(),
                                        lng:place.geometry.location.lng(),
                                        
                                    }
                                }];

                                dispatch(addEntregar(newEntregar));
                            
                            }else{

                                newEntregar = [...stateEntrgar,{ 
                                    direccion:place.formatted_address,
                                    location:{
                                        lat:place.geometry.location.lat(),
                                        lng:place.geometry.location.lng(),
                                        }
                                    }
                                ];

                                dispatch(addEntregar(newEntregar));
                            }
                             
                          


                           
                        }
                        


                    }   
                });
            }

        })
        .catch((e) => console.error(e) );
    }


    //create route between various points
    const createRoute = (config:{waypoints:any[]},mapInstance:google.maps.Map)=>{
        googleMapsLoader
        .load()
        .then((google) => {
            let optionsRoute ={
                markerOptions:{visible:false},
                polylineOptions:{strokeColor:'#320f75',zIndex:99999,strokeWeight:4}
            }
            
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer(optionsRoute);

            directionsRenderer.setMap(mapInstance);
            
            const waypoints:any[] = [];
            
            config.waypoints.forEach((point:any)=>{
                waypoints.push({
                    location: point,
                    stopover: true
                });
            });

            directionsService.route(
                {
                    origin: config.waypoints[0] ,
                    destination: config.waypoints[config.waypoints.length - 1],
                    waypoints: waypoints,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                .then((response) => {

                    directionsRenderer.setDirections(response);
                })
                .catch((e) => console.error(e));

        })
        .catch((e) => console.error(e) );
    }


    // Función para calcular la distancia y el tiempo total de la ruta de entrega (acumulados)
    const calculateTotalDistanceAndTime = (route:{waypoints:any[]},dispatch:any) => {
        googleMapsLoader
        .load()
        .then((google) => {
            const distanceMatrixService = new google.maps.DistanceMatrixService();
            const dataResponse:any[] = [];
    
            const waypoints = route.waypoints;
            let accumulatedDistance = 0;
            let accumulatedTime = 0;
    
            const calculateDistancesRecursively = (index:number) => {
                if (index < waypoints.length - 1) {

                    const origin = waypoints[index];
                    const destination = waypoints[index + 1];
        
                    distanceMatrixService.getDistanceMatrix(
                    {
                        origins: [origin],
                        destinations: [destination],
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (response, status) => {

                        if (status === "OK" && response !== null) {
                            const distance = response.rows[0].elements[0].distance;
                            const duration = response.rows[0].elements[0].duration;
            
                            accumulatedDistance += distance.value;
                            accumulatedTime += duration.value;
        
                            dataResponse[index] = {
                                id:index+1,
                                distance:{
                                    text:distance.text,
                                    value:distance.value
                                }, 
                                duration:{
                                    text:duration.text,
                                    value:duration.value
                                }
                            };
            
                            calculateDistancesRecursively(index + 1);
                        
                        } else {

                            console.error("Error calculating distances:", status);
                        }
                    }
                    );
                } else {

                    dataResponse[waypoints.length-1] = {
                        id:waypoints.length,
                        distance:{
                            text:'Total distance meters',
                            value:accumulatedDistance
                        },
                        duration:{
                            text:'Total duration seconds',
                            value:accumulatedTime
                        }

                    };

                    dispatch(setResponse(dataResponse));
        
                }
            };
    
            calculateDistancesRecursively(0);
        })
        .catch((e) => console.error(e));
    };

    // Función para crear un enlace a Google Maps con la ruta
    const createGoogleMapsLink = (route:{waypoints:any[]}) => {
        const waypoints = route.waypoints;
        const origin = waypoints[0];
        const destination = waypoints[waypoints.length - 1];
      
        const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            origin
        )}&destination=${encodeURIComponent(destination)}&waypoints=${waypoints
            .slice(1, -1)
            .map((waypoint) => encodeURIComponent(waypoint))
            .join("|")}&waypoint.1=${encodeURIComponent(
            origin
        )}&waypoint.2=${encodeURIComponent(
            destination
        )}&travelmode=driving`;

        return googleMapsLink;
    };

    const addGeoJSONLayer = (config:any, mapInstance:google.maps.Map)=>{

        GetData([config.url ]).then((data:any)=>{
            
            mapInstance.data.forEach((feature) => {
                mapInstance.data.remove(feature);
            });

            for(let i = 0; i < data.length; i++) {

                mapInstance.data.addGeoJson(data[i]);
            }

            mapInstance.data.setStyle({

                fillColor: '#320F75',
                strokeWeight: 4,
                strokeColor: '#320F75',
                fillOpacity: 0.2,
                strokeOpacity: 0.2,


            });


            
        });
    }

    return{
        MapElementDiv,
        RenderMap,
        Map,
        inputElement,
        InputPlaceAutocomplete,
        createRoute,
        calculateTotalDistanceAndTime,
        createGoogleMapsLink,
        Markers

    }
}