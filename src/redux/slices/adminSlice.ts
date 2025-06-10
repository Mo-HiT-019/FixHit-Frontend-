import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Admin{
    _id?:string,
    username:string,
    password:string
}



interface AdminState {
  admin: Admin | null;
}

const initialState : AdminState={
         admin:null
}

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{


        setAdmin(state,action:PayloadAction<AdminState["admin"]>){
            state.admin = action.payload
        },

        clearAdmin(state){
            state.admin=null
        }
    }
})

export const {setAdmin,clearAdmin}=adminSlice.actions;

export default adminSlice.reducer;