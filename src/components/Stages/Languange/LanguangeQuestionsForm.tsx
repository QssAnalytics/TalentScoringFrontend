import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import Radio from "../../RadioInput";
import Select from "../../Select";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { GeneralQuestionsFormProps } from "../Education/GeneralQuestionsForm";
import TextInput from "../../TextInput";

export type LanguangeQuestionsFormValues = {
  haveLanguageSkills: string;
  languageSkills: { id: number; answer: string };
  enlangCert: string;
  ielstScore: { id: number; answer: string };
  toelfScore: { id: number; answer: string };
  otherCert: string[];
};

const LanguangeQuestionsForm = ({
  stageIndex,
  subStageSlug,
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();

  const { stage_children } = stagesData?.[stageIndex] || {};

  const {
    slug: nextSlugName,
    stage_name: nextStageName,
    stage_children: nextStageChildren,
  } = stagesData?.[stageIndex + 1] || {};

  const {
    slug: prevSlugName,
    stage_name: prevStageName,
    stage_children: prevStageChildren,
  } = stagesData?.[0] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[stageIndex + 1] || {};

  const { slug: subSlugName } = stage_children?.[0] || {};

  const { slug: nextSubSlugName, stage_name: nextSubStageName } =
    nextStageChildren?.[0] || {};

  const {
    data: questionsData,
    error: questionsError,
    isLoading,
  } = useGetQuestionsQuery(subSlugName);

  const dispatch = useAppDispatch();

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: LanguangeQuestionsFormValues }) || {};

  const { register, handleSubmit, watch, reset, setValue } =
    useForm<LanguangeQuestionsFormValues>({
      defaultValues: {
        haveLanguageSkills: "",
        languageSkills: { id: 0, answer: "" },
        enlangCert: "",
        ielstScore: { id: 0, answer: "" },
        toelfScore: { id: 0, answer: "" },
        otherCert: [],
      },
    });

  const onSubmit: SubmitHandler<LanguangeQuestionsFormValues> = (data) =>
    console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as LanguangeQuestionsFormValues,
        })
      );
    });

    reset(formData);

    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;

  const inputProps = [
    { register: register("haveLanguageSkills") },
    { register: register("languageSkills") },
    { register: register("enlangCert") },
    { register: register("ielstScore") },
    { register: register("toelfScore") },
    { register: register("otherCert") },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-7">
        <div className="space-y-2">
          <label className="pl-2">{questions?.[0]?.question_title}*</label>

          <div className="flex gap-5">
            {questions?.[0]?.answers?.map(({ answer_title, id }, idx) => (
              <Radio
                key={id}
                label={answer_title}
                value={idx}
                register={inputProps[0].register}
              />
            ))}
          </div>
        </div>

        {formData?.haveLanguageSkills === "0" && (
          <>
            <Select
              label={`${questions?.[1]?.question_title}*`}
              options={questions?.[1]?.answers}
              register={inputProps[1].register}
              value={formData?.languageSkills?.answer}
            />
            {formData?.languageSkills?.answer === "İngilis dili" && (
              <>
                <div className="space-y-2">
                  <label className="pl-2">
                    {questions?.[2]?.question_title}*
                  </label>

                  <div className="flex gap-5">
                    {questions?.[2]?.answers?.map(
                      ({ answer_title, id }, idx) => (
                        <Radio
                          key={id}
                          label={answer_title}
                          value={idx}
                          register={inputProps[2].register}
                        />
                      )
                    )}
                  </div>
                </div>

                {formData?.enlangCert === "0" ? (
                  <Select
                    label={`${questions?.[3]?.question_title}*`}
                    options={questions?.[3]?.answers}
                    register={inputProps[3].register}
                    value={formData?.ielstScore?.answer}
                  />
                ) : formData?.enlangCert === "1" ? (
                  <Select
                    label={`${questions?.[4]?.question_title}*`}
                    options={questions?.[4]?.answers}
                    register={inputProps[4].register}
                    value={formData?.toelfScore?.answer}
                  />
                ) : formData?.enlangCert === "2" ? (
                  <TextInput
                    label={`${questions?.[5]?.question_title}*`}
                    register={inputProps[5].register}
                  />
                ) : null}
              </>
            )}
          </>
        )}
      </div>

      <LinkButton
        nav={{
          state: { stageName: prevStageName, subStageName: prevSubStageName },
          path: { slugName: prevSlugName, subSlugName: prevSubSlugName },
        }}
        type="outline"
        label="Geri"
        className="absolute left-0 -bottom-20"
      />

      <LinkButton
        nav={{
          state: { stageName: nextStageName, subStageName: nextSubStageName },
          path: { slugName: nextSlugName, subSlugName: nextSubSlugName },
        }}
        label="Növbəti"
        className="absolute right-0 -bottom-20"
      />
    </form>
  );
};

export default LanguangeQuestionsForm;
