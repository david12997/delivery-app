import { IconProps } from "./icons.type";
import React from "react";

export default function Arrow1(props:IconProps):JSX.Element {

    return<>
        <svg width={props.width} height={props.height} viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2 20.9084C4.73432 17.5705 7.16241 15.6766 9.28482 15.2262C11.4067 14.7764 13.4268 14.7082 15.3458 15.0223V21L24.3529 11.2457L15.3458 2V7.68156C11.7979 7.7095 8.78188 8.9825 6.29735 11.5C3.81338 14.0175 2.38056 17.1536 2 20.9084Z" fill={props.fill} stroke={props.fill} strokeWidth="4" strokeLinejoin="round"/>
        </svg>

    </>
}