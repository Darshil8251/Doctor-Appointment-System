import {createSlice} from '@reduxjs/toolkit';


export const alertSlice=createSlice({
    name:'alerts',
    initialState:{
        loading:false
    },
    reducers:{
        showLoading:(state)=>{
            state.loading=false;
        },
        hideLoading:(state)=>{
            state.loading=true
        }
    }
})
export const {showLoading,hideLoading}=alertSlice.actions