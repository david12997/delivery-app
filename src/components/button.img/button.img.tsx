'use client'

import Image from 'next/image'
import React from 'react'
import { ButtonImgProps } from './button.img.type'

const ButtonImg = (props:ButtonImgProps):JSX.Element =>{

    return<div onClick={props.click} style={{background:props.theme.primary,color:props.theme.secondary}} 
        className="cursor-pointer relative button-img w-[100%] h-[80px] flex items-center p-3 rounded-[6px]  mt-[40px]  mb-[40px]"
    >
        <div  className="text-btn-img text-[18px] font-bold ml-[10px]">
            {props.label}
        </div>

        <div className="img-btn-img absolute left-[85%]">
            <Image
                src={props.img}
                alt={`Imagen del servicio ${props.label}`}
                width={40}
                height={40}
            />
        </div>
    </div>
}

export default ButtonImg;