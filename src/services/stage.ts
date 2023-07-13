import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IQuestion, IStage } from "../types";

export const stageApi = createApi({
  reducerPath: "stageApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    getStage: builder.query<IStage[], void>({
      query: () => "stage-parent-lists/",
    }),
    getSubStage: builder.query<IStage[], void>({
      query: () => "stage-parent-lists/",
    }),
    getQuestions: builder.query<IQuestion[], string | undefined>({
      query: (subStageName) => `question-lists/${subStageName}`,
    }),
    getDependQuestions: builder.query<
      IQuestion[],
      { subSlugName?: string; dependQuestionId?: number }
    >({
      query: ({ subSlugName, dependQuestionId }) =>
        `question-lists/${subSlugName}/${dependQuestionId}`,
    }),
  }),
});

export const {
  useGetStageQuery,
  useGetSubStageQuery,
  useGetQuestionsQuery,
  useGetDependQuestionsQuery,
} = stageApi;
