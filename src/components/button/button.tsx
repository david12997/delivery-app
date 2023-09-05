'use client'

import React from "react"
import { ButtonProps } from "./button.type"

const Button = (props:ButtonProps):JSX.Element => {

    const publicStyles ={
        background:props.bg,
        color:props.color,
        height:props.height
    }

    return<>
        <button onClick={props.click} style={publicStyles} className="w-[100%]  rounded-xl shadow-md shadow-[#818181] mt-3 mb-3">
            <div className="relative  font-bold flex w-[100%] justify-center ">
                <div className="text-button text-[19px] font-bold">
                    {props.text}
                </div>

                <div className="absolute icon-button left-[86%] top-[14%]">
                    {props.icon}
                </div>
               
            </div>
        </button>
    </>
}

export default Button;