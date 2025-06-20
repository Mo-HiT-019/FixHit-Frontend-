import {createSlice,PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    user:{
    _id?:string;
    fullname:string;
    email:string;
    password:string;
    dob? : Date;
    mobile?: String
    profilePic?: string
    gender?: 'male' | 'female' | 'other';
    address?:[{
        residential?: string;
        city?: string;
        district?: string;
        state?: string;
        pincode?: string;
    }];
    wallet:number;
    isBlocked:boolean;
    createdAt?: Date;
    updatedAt?: Date;
    } | null;
}

const initialState :UserState ={
    user:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser(state,action:PayloadAction<UserState["user"]>){
            state.user=action.payload;
        },
        clearUser(state){
            state.user= null
        }
    }
})

export const {setUser,clearUser}=userSlice.actions;
export default userSlice.reducer;