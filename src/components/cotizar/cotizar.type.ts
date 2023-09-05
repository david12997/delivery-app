import { ThemeProp } from "../nav/nav.type"

export interface CotizarProps {
    data: string, //json from colllecction delivery route, field data
    typeDelivery:string
}

export interface ContextCotizadorProps {
    currentVisible:string,
    title:string,
    text_step:string,
    nextVisible:string
}

// steps Cotizar
export interface StepsProps {
    data: any, // json from colllecction delivery route, field data
    step1:Step1Props,
    step2:{
        click:()=>void,
    }
}

// step 1 Cotizar
export interface Step1Props {

    theme:ThemeProp,
    type:{
        uno:{
            label:string,
            img:string,
        },
        muchos:{
            label:string,
            img:string,
        },
        personas:{
            label:string,
            img:string,
        }
    },
    una_entrega?:{
        click:()=>void,
    },
    multiples_entregas?:{
        click:()=>void,
    },
    personas?:{
        click:()=>void,
    }
}

// step 2 Cotizar
export interface Step2Props {
    title:string,
    theme:ThemeProp,
    autocomplete:{
        MapElementDiv: React.MutableRefObject<HTMLDivElement | null>;
        RenderMap: (config: any) => void;
        inputElement: React.MutableRefObject<HTMLInputElement | null>;
        InputPlaceAutocomplete: (config: any,dispatch:any,stateRecoger:any, stateEntregar:any, typeCotizar:string, typeEntrega:string) => void;
    }
    clickNext:()=>void,
}