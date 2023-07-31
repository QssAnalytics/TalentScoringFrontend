import { createSlice, PayloadAction } from '@reduxjs/toolkit';

  interface MyState {

    currentPage: number;
    tehsil:string,
    tehsilPage:number,
    elave:boolean
   
  }
  
  const initialState: MyState = {
    tehsil:'',
    currentPage:1,
    tehsilPage:1,
    elave:false
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
        addElave:(state,action)=>{
          state.elave= action.payload
        },

}});
  
  export const {addData ,addTehsil,addTehsilPage,addElave} = dataSlice.actions;
  export default dataSlice.reducer;