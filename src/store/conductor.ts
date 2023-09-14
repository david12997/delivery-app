import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 

export interface ConductorState {
    login:boolean,
    hash:string,
}

const initialState: ConductorState = {
    login:false,
    hash:''
}

const ConductorSlice = createSlice({
    name: 'conductor',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.login = action.payload;
        },
        setHash: (state, action: PayloadAction<string>) => {
            state.hash = action.payload;
        }
    }
});

export const {setLogin, setHash} = ConductorSlice.actions;
export default ConductorSlice.reducer;
