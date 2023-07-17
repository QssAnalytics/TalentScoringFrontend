import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JobExperienceListProps, JobExperienceValues } from './JobExperienceForm';

const initialState:JobExperienceListProps={
  items:[]
}

const jobExperienceFormSlice=createSlice({
    name:"jobExperienceList",
    initialState,
    reducers:{
      add:(state,action:PayloadAction<JobExperienceValues>)=>{
        const newExperience=action.payload
       state.items.push(newExperience)
      },
      remove:(state,action:PayloadAction<string>)=>{
       state.items= state.items.filter((item)=>item.id!==action.payload);
      },
      edit:(state,action:PayloadAction<JobExperienceValues>)=>{
        const {items}=state
        state.items=items.map((item)=>
          item.id===action.payload.id  ? action.payload : item);
      }
    }
})


export default jobExperienceFormSlice.reducer;
export const {add,remove,edit}=jobExperienceFormSlice.actions;