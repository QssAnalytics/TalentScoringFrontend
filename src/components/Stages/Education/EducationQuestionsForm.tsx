import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import {
  useGetDependQuestionsQuery,
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

export type EducationQuestionsFormValues = {
  vocationalScore: string;
  bachelorsScore: string;
  masterScore: string;
  phdScore: string;
};

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
  } = useGetDependQuestionsQuery({
    subSlugName: subStageSlug,
    dependQuestionId: education?.id,
  });

  const { register, handleSubmit, watch, reset } =
    useForm<EducationQuestionsFormValues>({
      defaultValues: {
        vocationalScore: "",
        bachelorsScore: "",
        masterScore: "",
        phdScore: "",
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
    if (
      education?.id === 0 ||
      questions?.length === 0 ||
      education?.answer === "Orta təhsil"
    ) {
      console.log(state);
      state.subStageName === "Olimpiada sualları"
        ? nav(`/stages/${slugName}/${prevSubSlugName}`, {
            state: { subStageName: prevSubStageName, stageName: stageName },
          })
        : nav(`/stages/${slugName}/${subSlugName}`, {
            state: { subStageName: subStageName, stageName: stageName },
          });
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const inputProps = [
    { register: register("vocationalScore"), placeholder: "0-50" },
    { register: register("bachelorsScore"), placeholder: "0-700" },
    { register: register("masterScore"), placeholder: "0-100" },
    { register: register("phdScore"), placeholder: "0-8" },
  ];

  console.log(questions);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-7">
        {questions?.map(({ question_title, id }) => (
          <TextInput
            type="number"
            key={id}
            label={`${question_title}*`}
            placeholder={
              inputProps[id === 6 ? 0 : id >= 10 ? id - 9 : id > 7 ? id - 7 : 1]
                .placeholder
            }
            register={
              inputProps[
                id === 6 ? 0 : id >= 10 ? id - 9 : id >= 7 ? id - 7 : 2
              ].register
            }
          />
        ))}
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
