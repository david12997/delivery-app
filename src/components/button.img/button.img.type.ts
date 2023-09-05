import { ThemeProp } from "../nav/nav.type";

export interface ButtonImgProps {
    theme:ThemeProp,
    label:string,img:string
    click?:()=>void
}