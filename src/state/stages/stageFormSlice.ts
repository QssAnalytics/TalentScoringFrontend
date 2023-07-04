import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GeneralQuestionsFormValues } from "../../components/Stages/Education/GeneralQuestionsForm";
import { EducationQuestionsFormValues } from "../../components/Stages/Education/EducationQuestionsForm";
import { OlympiadQuestionsFormValues } from "../../components/Stages/Education/OlympiadQuestionsForm";
import { LanguangeQuestionsFormValues } from "../../components/Stages/Languange/LanguangeQuestionsForm";
import { SpecialSkillsFormValues } from "../../components/Stages/SpecialSkills/SpecialSkillsQuestionsForm";
import { SportFormValues } from "../../components/Stages/Sport/SportQuestionsForm";
import { ProgramSkillsValues } from "../../components/Stages/ProgramSkills/ProgramSkillsQuestionsForm";
import { OptionalLanguangeQuestionsFormValues } from "../../components/Stages/Languange/OptionalLanguangeQuestionsForm";
import { JobExperienceValues } from '../../components/Stages/JobExperience/JobExperienceForm';
export interface IInitialState<T> {
  name: string;
  formData: T;
}

type FormDataTypes =
  | GeneralQuestionsFormValues
  | EducationQuestionsFormValues
  | OlympiadQuestionsFormValues
  | LanguangeQuestionsFormValues
  | SpecialSkillsFormValues
  | ProgramSkillsValues
  | SportFormValues
  | OptionalLanguangeQuestionsFormValues
  | JobExperienceValues;

const initialState = [] as IInitialState<FormDataTypes>[];

const stageFormSlice = createSlice({
  name: "stageForm",
  initialState,
  reducers: {
    // addStageForm: (
    //   state,
    //   action: PayloadAction<IInitialState<FormDataTypes>>
    // ) => {
    //   const index = state.findIndex(({ name }) => name === action.payload.name);
    //   if (index !== -1) {
    //     state.push(action.payload);
    //   }
    // },
    updateStageForm: (
      state,
      action: PayloadAction<IInitialState<FormDataTypes>>
    ) => {
      const index = state.findIndex(({ name }) => name === action.payload.name);
      if (index !== -1) {
        return [
          ...state.slice(0, index),
          { ...state[index], formData: action.payload.formData },
          ...state.slice(index + 1),
        ];
      }

      state.push(action.payload);
    },
  },
});

export const { updateStageForm } = stageFormSlice.actions;

export default stageFormSlice.reducer;
