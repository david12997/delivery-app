'use client'

import { useEffect } from "react";
import Button from "../button/button";
import Input from "../input/input";
import { ThemeProp } from "../nav/nav.type";
import {  AuthUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { setLogin,setHash } from "@/store/conductor";



const Login = (props:{theme:ThemeProp}):JSX.Element => {
    

    const router = useRouter();
    const dispatch = useAppDispatch();
    const stateConductor = useAppSelector(state => state.conductor);

    useEffect(() => {
        if(stateConductor.login) router.push('/conductores/dashboard');
    }, [stateConductor]);

    const handleLogin = ():void => {

        const email = document.getElementById('email-input') as HTMLInputElement;
        const password = document.getElementById('password-input') as HTMLInputElement;

        if(email.value === '' || password.value === '') return alert('Debes llenar todos los campos');
        else{

            if(!email.value.includes('@')) return alert('El correo debe contener un @');
            else if(password.value.length < 8) return alert('La contraseña debe tener al menos 8 caracteres');
            else{

                AuthUser([process.env.NEXT_PUBLIC_DOMAIN as string +'/api/login'],email.value.trim(),password.value.trim())
                .then((res) => {
                    
                    if(res[0].status === 200){

                     
                        dispatch(setLogin(true));
                        dispatch(setHash(res[0].data[0].contrasena));
                       
                    }else{
                        
                        alert('Error al iniciar sesión, intentalo de nuevo');
                    }
                  
                })
                .catch((err) => {
                    console.error(err);
                    alert('Error al iniciar sesión, intentalo de nuevo');
                });

            }
        }

       
    }

    return<div style={{background:props.theme.white}} className="shadow-gray shadow-md relative w-[90%] md:w-[50%] h-[90vh]  bg-slate-100 rounded-md">
        
        <div className="p-2">
            <h1 style={{color:props.theme.primary}} className="text-3xl mt-2 font-bold text-center">Iniciar sesión</h1>
        </div>

        <div className="option  w-[100%] h-[160px] p-3 md:p-10">
            <Input
                label="Ingresa tu correo:"
                message="Ingresa el correo que te proporciono la empresa" 
                theme={props.theme}
                idInput="email-input"
                type="email"
            />

        </div>
        <br/>
        <div className="option  w-[100%] h-[160px] p-3 md:p-10">
            <Input
                label="Ingresa tu contraseña:"
                message="Ingresa tu contraseña" 
                theme={props.theme}
                idInput="password-input"
                type="password"
            />

        </div>
        
        <div className="submit w-[100%] h-[140px] absolute bottom-[10px] p-3 md:p-6">
            <Button
                text="Iniciar sesión"
                bg={props.theme.primary}
                color={props.theme.white}
                height="80px" 
                click={()=>handleLogin()}              
            />
        </div>

    </div>
}

export default Login;