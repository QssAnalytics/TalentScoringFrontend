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
import { GeneralQuestionsFormProps } from "./GeneralQuestionsForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


const validationSchema = Yup.object({ 
  wonOlympics: Yup.string().required("Bu section tələb olunur"),

  subjectOlympiad: Yup.object({
    id: Yup.number(),
    answer: Yup.string().required("Bu section tələb olunur"),
  }),
  highestOlympiad: Yup.object({
    id: Yup.number(),
    answer: Yup.string().required("Bu section tələb olunur"),
  }),
  rankOlympiad: Yup.object({
    id: Yup.number(),
    answer: Yup.string().required("Bu section tələb olunur"),
  }),
});
export type OlympiadQuestionsFormValues = Yup.InferType<typeof validationSchema>;

// export type OlympiadQuestionsFormValues = {
//   wonOlympics: string,
//   subjectOlympiad: { id: number; answer: string },
//   highestOlympiad: { id: number; answer: string },
//   rankOlympiad: { id: number; answer: string },
// };

const OlympiadQuestionsForm = ({
  stageIndex,
  subStageSlug,
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();

  const {
    slug: slugName,
    stage_name: stageName,
    stage_children,
  } = stagesData?.[stageIndex] || {};

  const {
    slug: nextSlugName,
    stage_name: nextStageName,
    stage_children: nextStageChildren,
  } = stagesData?.[stageIndex + 1] || {};

  const { slug: prevSubSlugName } = stage_children?.[stageIndex + 1] || {};

  const { slug: subSlugName, stage_name: subStageName } =
    stage_children?.[stageIndex + 2] || {};

  const { slug: nextSubSlugName } = nextStageChildren?.[stageIndex] || {};

  const {
    data: questionsData,
    error: questionsError,
    isLoading,
  } = useGetQuestionsQuery(subSlugName);

  const dispatch = useAppDispatch();

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: OlympiadQuestionsFormValues }) || {};

  const { register, handleSubmit, watch, formState: { errors }, reset } =
    useForm<OlympiadQuestionsFormValues>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        wonOlympics: "",
        subjectOlympiad: { id: 0, answer: "" },
        highestOlympiad: { id: 0, answer: "" },
        rankOlympiad: { id: 0, answer: "" },
      },
    });

  const onSubmit: SubmitHandler<OlympiadQuestionsFormValues> = (data) =>
    console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as OlympiadQuestionsFormValues,
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
    { register: register("wonOlympics") },
    { register: register("subjectOlympiad") },
    { register: register("highestOlympiad") },
    { register: register("rankOlympiad") },
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
                inputClassName={errors.wonOlympics && " outline outline-1 outline-red-400"}
              /> 
            ))} 
          </div> 
        </div>

        {formData?.wonOlympics === "0" && (
          <>
            <Select
              label={`${questions?.[1]?.question_title}*`}
              options={questions?.[1]?.answers}
              register={inputProps[1].register}
              value={formData?.subjectOlympiad?.answer}
              className={errors.subjectOlympiad && " border border-1 border-red-400"} 
            />
            

            <Select
              label={`${questions?.[2]?.question_title}*`}
              options={questions?.[2]?.answers}
              register={inputProps[2].register}
              value={formData?.highestOlympiad?.answer}
              className={errors.highestOlympiad && " border border-1 border-red-400"} 
            />
              

            <Select
              label={`${questions?.[3]?.question_title}*`}
              options={questions?.[3]?.answers}
              register={inputProps[3].register}
              value={formData?.rankOlympiad?.answer}
              className={errors.rankOlympiad && " border border-1 border-red-400"}
            />
            
          </>
        )}
        {(errors.wonOlympics ||
        errors.rankOlympiad ||
        errors.highestOlympiad||
        errors.subjectOlympiad ) && (
        <span className="text-xs text-red-500 px-1 ">
          Xanalar boş buraxılmamalıdır
        </span>
      )}
      </div>

      <LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName: prevSubSlugName },
        }}
        typeOf="outline"
        label="Geri"
        className="absolute left-0 -bottom-20"
      />

      <LinkButton
        nav={{
          state: { stageName: nextStageName, subStageName: nextSubSlugName },
          path: { slugName: nextSlugName, subSlugName: nextSubSlugName },
        }}
        label="Növbəti"
        className="absolute right-0 -bottom-20"
      />
    </form>
  );
};

export default OlympiadQuestionsForm;
