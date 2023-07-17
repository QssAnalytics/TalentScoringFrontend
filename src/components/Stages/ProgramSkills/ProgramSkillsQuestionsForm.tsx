import { useEffect, useState } from "react";
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
import { setShowReport } from "../../../state/report/reportSlice";
import SelectMult from "components/SelectMult";

export type ProgramSkillsValues = {
  haveProgramSkills: string;
  whichProgram: string[];
  whichScore: string[];
  whichLevel: { id: number; answer: string };
  whichLang: { id: number; answer: string };
  msOffice: string[];
  programs: string[];
  design: string[];
};

const ProgramSkills = ({
  stageIndex,
  subStageSlug,
}: GeneralQuestionsFormProps) => {
  const { showReport } = useAppSelector((state) => state.reportState);
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
  } = stagesData?.[4] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[0] || {};

  const { slug: subSlugName } = stage_children?.[0] || {};

  const { slug: nextSubSlugName, stage_name: nextSubStageName } =
    nextStageChildren?.[0] || {};
  console.log(subSlugName);

  const {
    data: questionsData,
    error: questionsError,
    isLoading,
  } = useGetQuestionsQuery(subSlugName);

  const dispatch = useAppDispatch();

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: ProgramSkillsValues }) || {};

  const { register, handleSubmit, watch, reset } = useForm<ProgramSkillsValues>(
    {
      defaultValues: {
        haveProgramSkills: "0",
        whichProgram: [],
        whichScore: [],
        whichLang: { id: 0, answer: "" },
        msOffice: [],
        programs: [],
        design: [],
      },
    }
  );

  const onSubmit: SubmitHandler<ProgramSkillsValues> = (data) =>
    console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as ProgramSkillsValues,
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
    { register: register("whichProgram") },
    { register: register("msOffice") },
    { register: register("programs") },
    { register: register("design") },
    { register: register("whichLevel") },
  ];

  console.log(questions);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-5">
        {/* <div className="space-y-2"> */}
        {/* <label className="pl-2">{questions?.[0]?.question_title}*</label>

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
        </div> */}

        <SelectMult
          label={`${questions?.[0]?.question_title}*`}
          options={questions?.[0]?.answers}
          register={inputProps[0].register}
          value={formData?.whichProgram}
          placeholder="Select Programs"
        />

        {formData?.whichProgram?.length > 0 ? (
          <div className="overflow-y-auto h-96 pb-4 space-y-4">
            {formData?.whichProgram?.includes("MS Office") && (
              <>
                <SelectMult
                  label={`${questions?.[1]?.question_title}*`}
                  options={questions?.[1]?.answers.slice(0, 3)}
                  register={inputProps[1]?.register}
                  value={formData?.msOffice}
                  placeholder="Select Programs"
                />
                {formData.msOffice.length > 0 &&
                  formData?.msOffice?.map((lang, index) => (
                    <div key={index} className="space-y-2">
                      <label className="pl-2">
                        {lang + " " + questions?.[2]?.question_title}*
                      </label>
                      <div className="flex gap-5">
                        {questions?.[2]?.answers?.map(
                          ({ answer_title, id }, idx) => (
                            <Radio
                              key={id}
                              label={answer_title}
                              value={answer_title}
                              register={register(`whichLevel${lang}`)}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
              </>
            )}
            {formData?.whichProgram?.includes("Proqramlaşdırma dilləri") && (
              <>
                <SelectMult
                  label={`${questions?.[3]?.question_title}*`}
                  options={questions?.[3]?.answers.slice(0, 3)}
                  register={inputProps[2]?.register}
                  value={formData?.programs}
                  placeholder="Select Programs"
                />
                {formData.programs.length > 0 &&
                  formData?.programs?.map((lang, index) => (
                    <div key={index} className="space-y-2">
                      <label className="pl-2">
                        {lang + " " + questions?.[2]?.question_title}*
                      </label>
                      <div className="flex gap-1">
                        {questions?.[4]?.answers?.map(
                          ({ answer_title, id }, idx) => (
                            <Radio
                              key={id}
                              label={answer_title}
                              value={answer_title}
                              register={register(`whichLevel${lang}`)}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                {/* <Select
                label={`${questions?.[3]?.question_title}*`}
                options={questions?.[3]?.answers}
                register={inputProps[3].register}
                value={formData?.whichLang?.answer}
              /> */}
                {formData.whichLang.answer && (
                  <div className="space-y-2">
                    <label className="pl-2">
                      {formData.whichLang.answer +
                        " " +
                        questions?.[4]?.question_title}
                      *
                    </label>
                    <div className="flex gap-5">
                      {questions?.[4]?.answers?.map(
                        ({ answer_title, id }, idx) => (
                          <Radio
                            key={id}
                            label={answer_title}
                            value={idx}
                            register={inputProps[4].register}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {formData?.whichProgram?.includes("Dizayn Proqramları") && (
              <>
                <SelectMult
                  label={`${questions?.[5]?.question_title}*`}
                  options={questions?.[5]?.answers.slice(0, 3)}
                  register={inputProps[3]?.register}
                  value={formData?.design}
                  placeholder="Select Programs"
                />
                {formData.design.length > 0 &&
                  formData?.design?.map((lang, index) => (
                    <div key={index} className="space-y-2">
                      <label className="pl-2">
                        {lang + " " + questions?.[2]?.question_title}*
                      </label>
                      <div className="flex gap-1">
                        {questions?.[4]?.answers?.map(
                          ({ answer_title, id }, idx) => (
                            <Radio
                              key={id}
                              label={answer_title}
                              value={answer_title}
                              register={register(`whichLevel${lang}`)}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                {/* <Select
                label={`${questions?.[3]?.question_title}*`}
                options={questions?.[3]?.answers}
                register={inputProps[3].register}
                value={formData?.whichLang?.answer}
              /> */}
                {formData.whichLang.answer && (
                  <div className="space-y-2">
                    <label className="pl-2">
                      {formData.whichLang.answer +
                        " " +
                        questions?.[4]?.question_title}
                      *
                    </label>
                    <div className="flex gap-5">
                      {questions?.[4]?.answers?.map(
                        ({ answer_title, id }, idx) => (
                          <Radio
                            key={id}
                            label={answer_title}
                            value={idx}
                            register={inputProps[4].register}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : null}
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

      <button
        className={`absolute -bottom-[79px] right-0 w-[180px] flex rounded-full justify-center items-center py-3.5 gap-4 bg-qss-secondary flex-row text-white text-white"}`}
        onClick={() => dispatch(setShowReport(!showReport))}
      >
        {/* <LinkButton
          nav={{
            state: { stageName: nextStageName, subStageName: nextSubStageName },
            path: { slugName: slug, subSlugName: nextSubSlugName },
          }}
          haveIcon={false}
          label="Yekunlaşdır"
          className="absolute right-0 -bottom-20"
        /> */}
        Yekunlaşdır
      </button>
    </form>
  );
};

export default ProgramSkills;
