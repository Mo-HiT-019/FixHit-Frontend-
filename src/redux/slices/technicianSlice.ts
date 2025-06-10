import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Technician {
    _id?: string;
    fullname: string;
    email: string;
    mobile: string;
    password: string;
    profilePic?: string;
    dob?: Date;
    gender?: string;
    address?: string;
    experience?:number;
    certification?:string;
    services?: string[];
    profileCompleted?:boolean;
    isVerified?: boolean;
    isListed?: boolean;
    wallet?: number;
  }

interface TechnicianState {
  technician: Technician | null;
}

const initialState : TechnicianState={
    technician:null
}

const technicianSlice = createSlice({
    name:"technician",
    initialState,
    reducers:{


        setTechnician(state,action:PayloadAction<TechnicianState["technician"]>){
            state.technician = action.payload
        },

        clearTechnician(state){
            state.technician=null
        }
    }
})

export const {setTechnician,clearTechnician}=technicianSlice.actions;

export default technicianSlice.reducer;