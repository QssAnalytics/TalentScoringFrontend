import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import TextInput from "../../TextInput";
import Radio from "../../RadioInput";
import Select from "../../Select";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Ad tələb olunur"),
  lastName: Yup.string().required("Soyad tələb olunur"),
  workExp: Yup.string().required("İş təcrübəsi tələb olunur"),

  curOccupation: Yup.object({
    id: Yup.number(),
    answer: Yup.string().required("Hazırdakı məşğuliyyətiniz tələb olunur"),
  }),
  education: Yup.object({
    id: Yup.number(),
    answer: Yup.string().required("Təhsiliniz tələb olunur"),
  }),
  educationGrant: Yup.object({
    id: Yup.number(),
    answer: Yup.string().required("CurOccupation is required"),
  }),
});
export type GeneralQuestionsFormValues = Yup.InferType<typeof validationSchema>;

// export type GeneralQuestionsFormValues = {
//   firstName: string;
//   lastName: string;
//   workExp: string;
//   curOccupation: { id: number; answer: string };
//   education: { id: number; answer: string };
//   educationGrant: { id: number; answer: string };
// };

export type GeneralQuestionsFormProps = {
  subStageSlug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stageIndex: any;
};

const GeneralQuestionsForm = ({
  stageIndex,
  subStageSlug,
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();

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

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset,
  } = useForm<GeneralQuestionsFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      workExp: "",
      curOccupation: { id: 0, answer: "" },
      education: { id: 0, answer: "" },
      educationGrant: { id: 0, answer: "" },
    },
  });

  const onSubmit: SubmitHandler<GeneralQuestionsFormValues> = (data) => data;

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);

      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as GeneralQuestionsFormValues,
        })
      );
    });
    reset(formData);
    return () => subscription.unsubscribe();
  }, [subStageSlug, watch, setError]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;
  console.log(errors.root);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex-col flex gap-5"
    >
      <div className="grid grid-cols-2 gap-4 ">
        <TextInput
          label="Ad*"
          register={register("firstName", { required: true })}
          className={errors.firstName && " outline outline-1 outline-red-400"}
        />

        <TextInput
          label="Soyad*"
          register={register("lastName", { required: true })}
          className={errors.lastName && " outline outline-1 outline-red-400"}
        />
      </div>

      <div className="space-y-2 mt-[-10px]">
        <label className="pl-2">{questions?.[0]?.question_title}*</label>

        <div className="flex gap-5">
          {questions?.[0]?.answers?.map(({ answer_title, id }) => (
            <Radio
              key={id}
              label={answer_title}
              value={id}
              register={register("workExp")}
              inputClassName={errors.workExp && " outline outline-1 outline-red-400"}
            />
          ))}
        </div>
      </div>

      {formData?.workExp && (
        <>
          <Select
            label={`${questions?.[1]?.question_title}*`}
            options={questions?.[1]?.answers?.filter(
              ({ answer_dependens_on }) =>
                answer_dependens_on === parseInt(formData?.workExp)
            )}
            register={register("curOccupation")}
            value={formData?.curOccupation?.answer}
            className={errors.curOccupation && " border border-1 border-red-400"}
          />

          <Select
            label={`${questions?.[2]?.question_title}*`}
            options={questions?.[2]?.answers}
            register={register("education")}
            value={formData?.education?.answer}
            className={errors.education && " border border-1 border-red-400"}
          />

          <Select
            label={`${questions?.[3]?.question_title}*`}
            options={questions?.[3]?.answers}
            register={register("educationGrant")}
            value={formData?.educationGrant?.answer}
            className={errors.educationGrant && " border border-1 border-red-400"}
          />
        </>
      )}
      {(errors.firstName ||
        errors.lastName ||
        errors.curOccupation ||
        errors.workExp ||
        errors.education ||
        errors.educationGrant) && (
        <span className="text-xs text-red-500 px-1 ">
          Xanalar boş buraxılmamalıdır
        </span>
      )}

      <LinkButton
        type="submit"
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName },
        }}
        // disabled={errors ? true : false}
        label="Növbəti"
        className="absolute right-0 -bottom-20"
      />
    </form>
  );
};

export default GeneralQuestionsForm;
