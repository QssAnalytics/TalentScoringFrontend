import { configureStore } from "@reduxjs/toolkit";
import { stageApi } from "../services/stage";
import stageFormReducer from "./stages/stageFormSlice";
import reportReducer from "./report/reportSlice";
import jobExperienceFormSlice from "../components/Stages/JobExperience/jobExperienceFormSlice";

export const store = configureStore({
  reducer: {
    [stageApi.reducerPath]: stageApi.reducer,
    stageForm: stageFormReducer,
    reportState: reportReducer,
    experiences:jobExperienceFormSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(stageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
