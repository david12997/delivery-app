import { IconProps } from "./icons.type";
import React from "react";

export default function Trash(props:IconProps):JSX.Element {

    return<>
        <svg width={props.width} height={props.height} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H2V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H14C14.5304 20 15.0391 19.7893 15.4142 19.4142C15.7893 19.0391 16 18.5304 16 18V5H3ZM7 17H5V8H7V17ZM13 17H11V8H13V17ZM13.618 2L12 0H6L4.382 2H0V4H18V2H13.618Z" fill={props.fill}/>
        </svg>



    </>
}