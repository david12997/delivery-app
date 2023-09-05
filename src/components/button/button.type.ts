export interface ButtonProps {
    text: string;
    bg: string;
    color: string;
    height: string;
    icon?:JSX.Element;
    disabled?:boolean;
    loading?:boolean;
    click?:()=>void;
    mouseOver?:()=>void;
    mouseOut?:()=>void;

}