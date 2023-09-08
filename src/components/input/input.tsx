import { ThemeProp } from "../nav/nav.type";

const Input = (props:{theme:ThemeProp,label:string,message:string, idInput:string,type:string}):JSX.Element => {

    return<>
        <label style={{color:props.theme.gray_dark}} className="text-sm font-semibold  text-[21px]">{props.label}</label>
        <input id={props.idInput} required type={props.type} className="w-[100%] h-[60px] border shadow-gray-300 shadow-sm rounded-md text-[20px]"/>
        <small style={{color:props.theme.black}} className="font-bold text-[12px]">{props.message}</small>
    </>

}

export default Input;