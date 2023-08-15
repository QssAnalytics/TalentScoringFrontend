import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import Radio from "../../RadioInput";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { GeneralQuestionsFormProps } from "../Education/GeneralQuestionsForm";
import SelectMult from "components/SelectMult";
import { XCircleIcon } from "@heroicons/react/24/outline";

export type SpecialSkillsFormValues = {
  haveSpecialSkills: string;
  specialSkills: string[];
  levelSkill: string;
  certSkill: "";
};


const levels = [
  { answer_title: "Həvəskar", id: 0 },
  { answer_title: "Peşəkar", id: 1 },
];

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
  } = stagesData?.[stageIndex] || {};

  const {
    slug: prevSlugName,
    stage_name: prevStageName,
    stage_children: prevStageChildren,
  } = stagesData?.[1] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[0] || {};

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
    ) as { formData: SpecialSkillsFormValues }) || {};

  const { register, handleSubmit, watch, reset, setValue } = useForm<
    SpecialSkillsFormValues | any
  >({
    defaultValues: {
      haveSpecialSkills: {},
      specialSkills: [],
      levelSkill: "",
      certSkill: "",
    },
  });

  const onSubmit: SubmitHandler<SpecialSkillsFormValues> = (data) =>
    console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      // console.log(value);
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
  console.log(formData);


  useEffect(() => {
    if (formData?.haveSpecialSkills?.answer === "Yoxdur") {
      reset({
        ...formData,
        specialSkills: [],
        levelSkill: "",
        certSkill: "",
      })
    }

  }, [formData?.haveSpecialSkills?.answer])

  useEffect(() => {
    if (formData?.specialSkills?.length !== 0) {
      reset({
        ...formData,
        haveSpecialSkills: {}
      })
    }

  }, [formData?.specialSkills?.length])

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;

  const inputProps = [
    { register: register("haveSpecialSkills") },
    { register: register("specialSkills") },
    { register: register("levelSkill") },
    { register: register("certSkill") },
  ];

  // console.log(formData);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-7">
        <div className="space-y-2">
          <label className="pl-2">{questions?.[1]?.question_title}*</label>
          <div className="flex gap-5">
            <div className="w-[70%]">
              <SelectMult
                value={formData?.specialSkills}
                options={questions?.[1]?.answers}
                register={inputProps[1].register}
                placeholder={"Xüsusi bacarığını seç"}
              />
            </div>
            {
              <Radio
                options={questions?.[0]?.answers}
                value={formData?.haveSpecialSkills}
                register={inputProps[0].register}
              />
            }
          </div>
        </div>

        <>
          {formData?.specialSkills?.length > 0 ? (
            <div className="space-y-2 animate-fade-in">
              <label className="pl-2">
                {questions?.[2]?.question_title}*
              </label>

              <div className="flex gap-5 flex-col">
                {formData?.specialSkills?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between animate-fade-in w-full gap-4"
                  >
                    <div className="py-2 px-2 gap-1 rounded-full whitespace-nowrap bg-qss-input flex justify-center items-center w-64">
                      <span className="w-3/4 flex justify-center">
                        {item}
                      </span>
                      <XCircleIcon
                        onClick={() => {
                          setValue(
                            "specialSkills",
                            formData?.specialSkills?.filter(
                              (specialSkill) => specialSkill !== item
                            )
                          )
                          setValue(
                            `${item}`, undefined
                          )
                        }
                        }
                        className="w-5 h-5 text-red-400 cursor-pointer"
                      />
                    </div>
                    <div className="flex  w-full justify-between">

                      <Radio
                        options={levels}
                        value={watch(item)}
                        register={register(item)}
                      />

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </>
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
