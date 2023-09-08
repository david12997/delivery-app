'use client'

import { useEffect } from "react";
import Button from "../button/button";
import Input from "../input/input";
import { ThemeProp } from "../nav/nav.type";



const Login = (props:{theme:ThemeProp}):JSX.Element => {
    

    

    const handleLogin = ():void => {
        const email = document.getElementById('email-input') as HTMLInputElement;
        const password = document.getElementById('password-input') as HTMLInputElement;

        if(email.value === '' || password.value === '') return alert('Debes llenar todos los campos');
        else{

            if(!email.value.includes('@')) return alert('El correo debe contener un @');
            else if(password.value.length < 8) return alert('La contraseña debe tener al menos 8 caracteres');
            else{

                console.log(email.value);
                console.log(password.value);
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