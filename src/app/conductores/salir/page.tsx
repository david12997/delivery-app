'use client'

import { useAppDispatch, useAppSelector } from "@/store";
import { setHash, setLogin } from "@/store/conductor";
import { useEffect } from "react";

const SalirConductor =  ():JSX.Element => {


    const stateConductor = useAppSelector(state => state.conductor);
    const dispatch = useAppDispatch();

    useEffect(()=>{

       dispatch(setLogin(false));
       dispatch(setHash(''));

        setTimeout(() => {
            window.location.href = '/conductores';
        }, 1000);

    },[])
  
    return<section className="w-[screen] h-[98vh] flex items-center justify-center">
        <h1 className="font-extrabold  text-[25px]">Vuelve Pronto</h1>
    </section> 
}

export default SalirConductor; 