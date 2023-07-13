import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { GeneralQuestionsFormProps } from "../Education/GeneralQuestionsForm";
import MultiLeveling from "../../MultiLeveling";

export type OptionalLanguangeQuestionsFormValues = {
  optionalLanguange: { id: number; name: string; level: string | number }[];
};

const OptionalLanguangeQuestionsForm = ({
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
    prevStageChildren?.[stageIndex - 1] || {};

  const { slug: subSlugName } = stage_children?.[1] || {};

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
    ) as { formData: OptionalLanguangeQuestionsFormValues }) || {};

  const { register, handleSubmit, watch, reset } =
    useForm<OptionalLanguangeQuestionsFormValues>({
      defaultValues: {
        optionalLanguange: [],
      },
    });

  const onSubmit: SubmitHandler<OptionalLanguangeQuestionsFormValues> = (
    data
  ) => console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as OptionalLanguangeQuestionsFormValues,
        })
      );
    });

    reset(formData);

    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;

  const inputProps = [{ register: register("optionalLanguange") }];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex-col flex gap-5"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <MultiLeveling
            placeholder="Əlavə et"
            label={`${questions?.[0]?.question_title}*`}
            register={inputProps[0].register}
            value={formData?.optionalLanguange}
            data={questions?.[0]?.answers}
          />
          {/* {formData?.optionalLanguange.map((d) => (
            <div>{d}</div>
          ))} */}
          {/* <div className="flex gap-5">
            {questions?.[0]?.answers?.map(({ answer_title, id }, idx) => (
              <Radio
                key={id}
                label={answer_title}
                value={idx}
                register={inputProps[0].register}
              />
            ))}
          </div> */}
        </div>
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

export default OptionalLanguangeQuestionsForm;
