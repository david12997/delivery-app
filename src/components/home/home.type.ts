import { ThemeProp } from "../nav/nav.type";

export interface HomeProps {
    dataBrand:string ;
}

//buttons client component
export interface ContainerButtons{
    theme:ThemeProp,
    items:ItemsContainerButtons[],
}

export interface ItemsContainerButtons{
    name:string,
    link:string,
}