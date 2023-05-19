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

export type SpecialSkillsFormValues = {
  haveSpecialSkills: string;
  specialSkills: { id: number; answer: string };
  levelSkill: string;
  certSkill: "";
};

const SpecialSkillsForm = ({
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
  } = stagesData?.[1] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[0] || {};

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
    ) as { formData: SpecialSkillsFormValues }) || {};

  const { register, handleSubmit, watch, reset } =
    useForm<SpecialSkillsFormValues>({
      defaultValues: {
        haveSpecialSkills: "",
        specialSkills: { id: 0, answer: "" },
        levelSkill: "",
        certSkill: "",
      },
    });

  const onSubmit: SubmitHandler<SpecialSkillsFormValues> = (data) =>
    console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as SpecialSkillsFormValues,
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
    { register: register("haveSpecialSkills") },
    { register: register("specialSkills") },
    { register: register("levelSkill") },
    { register: register("certSkill") },
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

        {formData?.haveSpecialSkills === "0" && (
          <>
            <div className="space-y-2">
              <label className="pl-2">{questions?.[1]?.question_title}*</label>

              <div className="flex gap-5 flex-wrap w-full">
                {questions?.[1]?.answers?.map(({ answer_title, id }, idx) => (
                  <Radio
                    key={id}
                    label={answer_title}
                    value={idx}
                    register={inputProps[1].register}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="pl-2">{questions?.[2]?.question_title}*</label>

              <div className="flex gap-5">
                {questions?.[2]?.answers?.map(({ answer_title, id }, idx) => (
                  <Radio
                    key={id}
                    label={answer_title}
                    value={idx}
                    register={inputProps[2].register}
                  />
                ))}
              </div>
            </div>

            <TextInput
              value={watch("certSkill")}
              label={`${questions?.[3]?.question_title}*`}
              register={inputProps[3].register}
              haveRadio
            />
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

export default SpecialSkillsForm;
