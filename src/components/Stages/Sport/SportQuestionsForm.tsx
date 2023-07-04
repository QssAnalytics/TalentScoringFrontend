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

export type SportFormValues = {
  haveSportCar: string;
  whichSport: string[];
  whichScore: string[];
  whichPlace: string[];
};

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
    ) as { formData: SportFormValues }) || {};

  const { register, handleSubmit, watch, reset } = useForm<SportFormValues>({
    defaultValues: {
      haveSportCar: "",
      whichSport: [],
      whichScore: [],
      whichPlace: [],
    },
  });

  const onSubmit: SubmitHandler<SportFormValues> = (data) => console.log(data);

  useEffect(() => {
    const subscription = watch((value) => {
      // console.log(value);
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

  const inputProps = [
    { register: register("haveSportCar") },
    { register: register("whichSport") },
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

        {formData?.haveSportCar === "0" && (
          <>
            <SelectMult
              placeholder="Idman Secimi"
              label={`${questions?.[1]?.question_title}*`}
              options={questions?.[1]?.answers}
              register={inputProps[1].register}
              value={formData?.whichSport}
            />

            <div className="h-[275px] overflow-y-auto pr-5 mr-[-20px]">
              {formData?.whichSport?.length !== 0 &&
                formData?.whichSport?.map((item, index) => (
                  <div
                    className="border rounded-xl border-[#D8D8D8] p-2.5 mb-5 relative pr-5"
                    key={index}
                  >
                    <Icon
                      icon="zondicons:close-outline"
                      color="#ee4a4a"
                      width="24"
                      className="absolute top-1.5 right-1.5 cursor-pointer"
                      onClick={() => {
                        const newWhichSport = formData?.whichSport?.filter(
                          (el) => el !== item
                        );
                        dispatch(
                          updateStageForm({
                            name: subStageSlug,
                            formData: {
                              ...formData,
                              whichSport: newWhichSport,
                            },
                          })
                        );
                      }}
                    />
                    <label>
                      <span className="text-qss-secondary font-semibold">
                        {item}
                      </span>{" "}
                      üzrə, hansı turda,neçənci yer əldə etmisiniz?
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Select
                          label={``}
                          options={questions?.[2]?.answers}
                          register={register(`whichScore${index}`)}
                          value={formData?.[`whichScore${index}`]?.answer}
                        />
                      </div>
                      <div className="col-span-1 ">
                        <Select
                          label={``}
                          options={questions?.[3]?.answers}
                          register={register(`whichPlace${index}`)}
                          value={formData?.[`whichPlace${index}`]?.answer}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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

export default SportForm;
