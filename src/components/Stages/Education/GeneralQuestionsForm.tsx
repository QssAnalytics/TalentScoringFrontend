import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import TextInput from "../../TextInput";
import Select from "../../Select";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { ISelectedValue } from "types";
import { addTehsil } from "state/dataSlice";
import {useSelector} from 'react-redux';
export type GeneralQuestionsFormValues = {
  firstName: string;
  lastName: string;
  curOccupation: ISelectedValue;
  education: ISelectedValue;
  educationGrant: ISelectedValue;
  
};
interface RootState {
	dataa: {
		tehsil: string;
	};
}
export type GeneralQuestionsFormProps = {
  subStageSlug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stageIndex: any;
  num:number
};

const GeneralQuestionsForm = ({
  stageIndex,
  subStageSlug,
  num
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();
  const tehsil = useSelector((state: RootState) => state.dataa.tehsil);
  const {
    slug: slugName,
    stage_name: stageName,
    stage_children,
  } = stagesData?.[0] || {};


  const { slug: subSlugName, stage_name: subStageName } =
  stage_children?.[stageIndex + 1] || {};

  const {
    data: questionsData,
    error: questionsError,
    isLoading,
  } = useGetQuestionsQuery(subStageSlug);

  const dispatch = useAppDispatch();

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: GeneralQuestionsFormValues }) || {};

  const { register, handleSubmit, watch, reset } =
    useForm<GeneralQuestionsFormValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        curOccupation: { answer: "", weight: "" },
        education: { answer: "", weight: "" },
        educationGrant: { answer: "", weight: "" },
      },
    });

  const onSubmit: SubmitHandler<GeneralQuestionsFormValues> = (data) => data;
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(addTehsil(value.education.answer))
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as GeneralQuestionsFormValues,
        })
      );
    });
   
    reset(formData);
    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex-col flex gap-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Ad*"
          register={register("firstName", { required: true })}
        />
        <TextInput label="Soyad*" register={register("lastName")} />
      </div>

      <Select
        label={`${questions?.[0]?.question_title}*`}
        options={questions?.[0]?.answers}
        register={register("curOccupation")}
        value={formData?.curOccupation}
      />

      <Select
        label={`${questions?.[1]?.question_title}*`}
        options={questions?.[1]?.answers}
        register={register("education")}
        value={formData?.education}
      />

      <Select
        label={`${questions?.[2]?.question_title}*`}
        options={questions?.[2]?.answers}
        register={register("educationGrant")}
        value={formData?.educationGrant}
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

export default GeneralQuestionsForm;
