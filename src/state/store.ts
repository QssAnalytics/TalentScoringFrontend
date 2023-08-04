import { configureStore } from "@reduxjs/toolkit";
import { stageApi } from "../services/stage";
import stageFormReducer from "./stages/stageFormSlice";
import reportReducer from "./report/reportSlice";
import dataReducer from './dataSlice'
export const store = configureStore({
  reducer: {
    [stageApi.reducerPath]: stageApi.reducer,
    stageForm: stageFormReducer,
    reportState: reportReducer,
    dataa: dataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(stageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
