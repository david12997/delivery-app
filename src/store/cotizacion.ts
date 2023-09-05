import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

export interface CotizacionState {
    recoger: {direccion:string,location:{lat:string | number, lng:string | number}}[],
    entregar: {direccion:string,location:{lat:string | number, lng:string | number}}[],
    tipo_entrega:string,
    en_ejecucion:boolean,
    response:any,
    link_route:string
}

const initialState: CotizacionState = {
    recoger: [],
    entregar: [],
    tipo_entrega:'',
    en_ejecucion:false,
    response:null,
    link_route:''
}

const CotizacionSlice = createSlice({
    name: 'cotizacion',
    initialState,
    reducers: {
        addRecoger: (state, action: PayloadAction<{direccion:string,location:{lat:string | number, lng:string | number}}[]>) => {
            state.recoger = action.payload;
        },
        addEntregar: (state, action: PayloadAction<{direccion:string,location:{lat:string | number, lng:string | number}}[]>) => {
            state.entregar = action.payload;
        },
        addTipoEntrega: (state, action: PayloadAction<string>) => {
            state.tipo_entrega = action.payload;
        },
        setEnEjecucion: (state, action: PayloadAction<boolean>) => {
            state.en_ejecucion = action.payload;
        },
        setResponse: (state, action: PayloadAction<any>) => {
            state.response = action.payload;
        },
        setLinkRoute: (state, action: PayloadAction<string>) => {
            state.link_route = action.payload;
        }
    }
});

export const {addRecoger, addEntregar,addTipoEntrega, setEnEjecucion, setResponse, setLinkRoute} = CotizacionSlice.actions;
export default CotizacionSlice.reducer;