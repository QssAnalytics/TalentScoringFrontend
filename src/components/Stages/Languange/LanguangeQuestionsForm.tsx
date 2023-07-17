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
import SelectMult from "../../SelectMult";

export type LanguangeQuestionsFormValues = {
  haveLanguageSkills: string;
  languageSkills: string[];
  enlangCert: string;
  engLevel: { id: number; answer: string };
  ruLevel: { id: number; answer: string };
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
  } = stagesData?.[stageIndex] || {};
  const {
    slug: prevSlugName,
    stage_name: prevStageName,
    stage_children: prevStageChildren,
  } = stagesData?.[0] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[stageIndex + 1] || {};

  const { slug: subSlugName } = stage_children?.[0] || {};

  const { slug: nextSubSlugName, stage_name: nextSubStageName } =
    nextStageChildren?.[1] || {};

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
        languageSkills: [],
        enlangCert: "",
        engLevel: { id: 0, answer: "" },
        ruLevel: { id: 0, answer: "" },
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
    { register: register("engLevel") },
    { register: register("ruLevel") },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex-col flex gap-5"
    >
      <div className="space-y-4">
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
            <SelectMult
              placeholder="Dil Seçimi"
              label={`${questions?.[1]?.question_title}*`}
              options={questions?.[1]?.answers}
              register={inputProps[1].register}
              value={formData?.languageSkills}
            />

            {formData?.languageSkills?.find(
              (lang) => lang === "İngilis dili"
            ) && (
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
                    value={formData?.engLevel?.answer}
                  />
                ) : formData?.enlangCert === "1" ? (
                  <TextInput
                    label={`${questions?.[4]?.question_title}*`}
                    register={inputProps[3].register}
                  />
                ) : formData?.enlangCert === "2" ? (
                  <div className="space-y-2">
                    <label className="pl-2">
                      {questions?.[6]?.question_title}*
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {questions?.[5]?.answers?.map(
                        ({ answer_title, id }, idx) => (
                          <Radio
                            key={id}
                            label={answer_title}
                            value={idx}
                            type="button"
                            register={inputProps[3].register}
                          />
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </>
            )}

            {formData?.languageSkills?.find((lang) => lang === "Rus dili") && (
              <>
                <div className="space-y-2">
                  <label className="pl-2">
                    {questions?.[5]?.question_title}*
                  </label>
                  {formData?.languageSkills?.length > 1 ? (
                    <div className="flex gap-5">
                      {questions?.[5]?.answers?.map(
                        ({ answer_title, id }, idx) => (
                          <Radio
                            key={id}
                            label={answer_title.split(" ")[0]}
                            value={idx}
                            type="button"
                            register={inputProps[4].register}
                          />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {questions?.[5]?.answers?.map(
                        ({ answer_title, id }, idx) => (
                          <Radio
                            key={id}
                            label={answer_title}
                            value={idx}
                            type="button"
                            register={inputProps[4].register}
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
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
