import { createSlice, PayloadAction } from '@reduxjs/toolkit';


  interface MyState {

    currentPage: number;
    tehsil:string,
    tehsilPage:number,
    elave:boolean,
    popUp:boolean,
    removeFunc:boolean
   
  }
  
  const initialState: MyState = {
    tehsil:'',
    currentPage:1,
    tehsilPage:1,
    elave:false,
    popUp:false,
    removeFunc:false
  };
  const dataSlice = createSlice({
    name: 'dataa',
    initialState,
    reducers: {
        addData:(state, action)=>{
            state.currentPage=state.currentPage+ action.payload;
        },
        addTehsil:(state,action)=>{
          state.tehsil= action.payload
        },
        addTehsilPage:(state,action)=>{
          state.tehsilPage+= action.payload
        },
        changeTehsilPage:(state,action)=>{
          state.tehsilPage = action.payload
        },
        addElave:(state,action)=>{
          state.elave= action.payload
        },
        addPop:(state,action)=>{
          state.popUp = action.payload
        },
       addRemove: (state,action)=>{
           state.removeFunc = action.payload
        }

}});
  
  export const {addData ,addTehsil,addTehsilPage,addElave,changeTehsilPage,addPop,addRemove} = dataSlice.actions;
  export default dataSlice.reducer;