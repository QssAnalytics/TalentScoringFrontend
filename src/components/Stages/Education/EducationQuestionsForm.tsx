import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetDependQuestionsQuery,
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import TextInput from "../../TextInput";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { useSelector } from 'react-redux';
import {
  GeneralQuestionsFormProps,
  GeneralQuestionsFormValues,
} from "./GeneralQuestionsForm";
import Select from "components/Select";
import { ISelectedValue } from "types";

import * as yup from "yup";
import EducationAdd from "./components/EducationAdd";
import { AddEduFormValues } from "./components/FormEducations";
import Educations from "./components/Educations";

const schema = yup.object({
  education: yup.array().required(),

});
interface RootState {
  dataa: {
    currentPage:1,
    tehsil:string
  };
}
export type EducationQuestionsFormValues = yup.InferType<typeof schema>;

const EducationQuestionsForm = ({
  subStageSlug,
  stageIndex,
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();


  const nav = useNavigate();
  const page= useSelector((state: RootState) => state.dataa.currentPage);
  const tehsil= useSelector((state: RootState) => state.dataa.tehsil);
  const { state } = useLocation();
  console.log(tehsil);
  
  const {
    slug: slugName,
    stage_name: stageName,
    stage_children,
  } = stagesData?.[stageIndex] || {};

  const { slug: subSlugName, stage_name: subStageName } =
    stage_children?.[stageIndex + 2] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    stage_children?.[stageIndex] || {};

  const dispatch = useAppDispatch();
  const { education } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === prevSubSlugName
    )?.formData as GeneralQuestionsFormValues) || {};

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: EducationQuestionsFormValues }) || {};

  const {
    data: questionsData,
    error: questionsError,
    isLoading,
  } = useGetQuestionsQuery(subStageSlug);
  
  const { register, handleSubmit, watch, reset,setValue } =
    useForm<EducationQuestionsFormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        education:[]
      },
    });

  const onSubmit: SubmitHandler<EducationQuestionsFormValues> = (data) =>
    console.log(data);




  const questions = questionsData?.[0]?.questions;
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as EducationQuestionsFormValues,
        })
      );
      if (
        tehsil === "Orta təhsil" ||
        tehsil === "Peşə təhsili"
      ) {
        state.subStageName === "Olimpiada sualları"
          ? nav(`/stages/${slugName}/${prevSubSlugName}`, {
              state: { subStageName: prevSubStageName, stageName: stageName },
            })
          : nav(`/stages/${slugName}/${subSlugName}`, {
              state: { subStageName: subStageName, stageName: stageName },
            });
      }
    });
    

    reset(formData);

    return () => {
      subscription.unsubscribe();
    };
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;


  const handleAddEdu = (eduData:AddEduFormValues) => {
    const data = formData?.education;
    setValue("education", [...data, eduData]);
    // setIsAdding(false);
  }

  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-7">
        {
          page===1?<EducationAdd handleAddEdu={handleAddEdu} questions={questions} formData={formData}/>:<Educations formData={formData} setValue={setValue}/>
        }
        
      </div>

      <LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName: prevSubSlugName },
        }}
        type="outline"
        label="Geri"
        className="absolute left-0 -bottom-20"
      />

      <LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName },
        }}
        label="Növbəti"
        className="absolute right-0 -bottom-20"
      />
    </form>
  );
};

export default EducationQuestionsForm;
