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
import { Icon } from "@iconify/react";
import SelectMult from "../../SelectMult";
import * as yup from 'yup';
import removeIcon from "../../../assets/Vector.svg";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup
  .object({
    sport: yup
      .object({
        answer: yup.string().required(),
        weight: yup.string().required(),
      })
      .required(),
    whichSport: yup
      .array().of(yup.object().shape({
        answer: yup.string().required(),
        weight: yup.string().required(),
      }))
      .required(),
    whichLevel: yup
      .object({
        answer: yup.string().required(),
        weight: yup.string().required(),
      })
      .required(),
    whichScore: yup
      .object({
        answer: yup.string().required(),
        weight: yup.string().required(),
      })
      .required(),
    whichPlace: yup
      .object({
        answer: yup.string().required(),
        weight: yup.string().required(),
      })
      .required(),

  })
  .required();

export type SportFormValues = yup.InferType<typeof schema>;


const staticAnswers = [
  {
    id: 0,
    answer_title: "Heveskar",
    answer_weight: null
  }
  , {
    id: 1,
    answer_title: "Pesekar",
    answer_weight: null
  }
]

const SportForm = ({ stageIndex, subStageSlug }: GeneralQuestionsFormProps) => {
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
  } = stagesData?.[2] || {};

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
    ) as { formData: SportFormValues & any }) || ({} as any);

  const { register, handleSubmit, watch, reset } = useForm<
    SportFormValues
  >({
    defaultValues: {
      sport: { answer: "", weight: "" },
      whichSport: [],
      whichLevel: { answer: "", weight: "" },
      whichScore: { answer: "", weight: "" },
      whichPlace: { answer: "", weight: "" },
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<SportFormValues> = (data) => console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as SportFormValues,
        })
      );
      // console.log(value);
    });
    reset(formData);

    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;
  console.log(watch()?.sport?.answer)
  const inputProps = [
    { register: register("sport") },
    { register: register("whichSport") },
    { register: register("whichLevel") },
    { register: register("whichScore") },
    { register: register("whichPlace") },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-7 ">
        <div className="space-y-2">
          <label className="pl-2">{questions?.[0]?.question_title}*</label>

          <div className="flex gap-5">
            {questions?.[0]?.answers?.map(({ answer_weight, answer_title, id }) => (
              <Radio
                key={id}
                label={answer_title}
                value={{
                  answer: answer_title,
                  weight: answer_weight,
                }}
                register={inputProps[0].register}
              />
            ))}
          </div>
        </div>
        <>
            <SelectMult
              placeholder="Idman Secimi"
              label={`${questions?.[1]?.question_title}*`}
              options={questions?.[1]?.answers}
              register={inputProps[1].register}
              value={formData?.whichSport}
            />


            <div className="pr-2">
              <label >{questions?.[2]?.question_title}*</label>

              {formData?.whichSport?.length !== 0 &&
                formData?.whichSport?.map((item: any, index: any) => (
                  <div
                    className="p-2.5 relative flex gap-4 "
                    key={index}
                  >
                    <span className="bg-qss-input cursor-pointer relative py-2 max-w-[142px] w-full justify-center items-center flex rounded-full px-4 gap-2">
                      <span>{item} </span>
                      <img src={removeIcon} alt="remove" />
                    </span>
                    {staticAnswers?.map(({ answer_weight, answer_title, id }) => (
                      <Radio
                        key={id}
                        label={answer_title}
                        value={{
                          answer: answer_title,
                          weight: answer_weight,
                        }}
                        register={inputProps[2].register}
                      />
                    ))}
                  </div>
                ))}
            </div>
          </>
        {/* {formData?.sport.answer === "Bəli" && (
         
        )} */}
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

export default SportForm;
