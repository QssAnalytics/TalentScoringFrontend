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

import {
  GeneralQuestionsFormProps,
  GeneralQuestionsFormValues,
} from "./GeneralQuestionsForm";
import Select from "components/Select";
import { ISelectedValue } from "types";

import * as yup from "yup";
import EducationAdd from "./components/EducationAdd";

const schema = yup.object({
  bachelor: yup.array().required(),
  master: yup.array().required(),
  phd: yup.array().required(),
});

export type EducationQuestionsFormValues = yup.InferType<typeof schema>;

const EducationQuestionsForm = ({
  subStageSlug,
  stageIndex,
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();

  const nav = useNavigate();

  const { state } = useLocation();

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

  const { register, handleSubmit, watch, reset } =
    useForm<EducationQuestionsFormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        bachelor: [],
        master: [],
        phd: [],
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
    });

    reset(formData);

    return () => {
      subscription.unsubscribe();
    };
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  console.log(questions);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-7">
        <EducationAdd />
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
