import { createSlice } from "@reduxjs/toolkit";
import { boolean } from "yup";

interface IInitialState {
  showReport: boolean;
}

const initialState: IInitialState = {
  showReport: false,
};

const reportSlice = createSlice({
  name: "reportState",
  initialState,
  reducers: {
    setShowReport: (state, action) => {
      state.showReport = action.payload;
    },
  },
});

export const { setShowReport } = reportSlice.actions;
export default reportSlice.reducer;
