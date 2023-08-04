import { Fragment, useEffect } from "react";
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
import * as yup from "yup";
import removeIcon from "../../../assets/Vector.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import DetailedSportInfo from "./ProLevelList";
import SportLevels from "./components/SportLevels";
import { ISelectedValue } from "types";

const schema = yup
  .object({
    sport: yup
      .object({
        answer: yup.string().required(),
        weight: yup.string().required(),
      })
      .required(),
    whichSport: yup
      .array()
      .of(
        yup.object().shape({
          answer: yup.string().required(),
        })
      )
      .required(),
    professionals: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        level: yup.object().shape({
          answer: yup.string().required(),
          weight: yup.string().required(),
        }),
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
    ),
    amateurs: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        level: yup.object().shape({
          answer: yup.string().required(),
          weight: yup.string().required(),
        }),
      })
    ),
  })
  .required();

export type SportFormValues = yup.InferType<typeof schema>;

export interface IItem {
  name: string;
  level: ISelectedValue;
  whichScore: ISelectedValue;
  whichPlace: ISelectedValue;
}

const SportForm = ({ stageIndex, subStageSlug }: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();

  const { stage_children } = stagesData?.[stageIndex] || {};

  const {
    slug: nextSlugName,
    stage_name: nextStageName,
    stage_children: nextStageChildren,
  } = stagesData?.[stageIndex] || {};

  const {
    slug: nextSlugNameCond,
    stage_name: nextStageNameCond,
    stage_children: nextStageChildrenCond,
  } = stagesData?.[4] || {};
  const {
    slug: prevSlugName,
    stage_name: prevStageName,
    stage_children: prevStageChildren,
  } = stagesData?.[2] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[1] || {};

  const { slug: subSlugName } = stage_children?.[0] || {};
  const { slug: nextSubSlugName, stage_name: nextSubStageName } =
    nextStageChildren?.[1] || {};
  const { slug: nextSubSlugNameCond, stage_name: nextSubStageNameCond } =
    nextStageChildrenCond?.[0] || {};
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

  const { register, handleSubmit, watch, reset, setValue } =
    useForm<SportFormValues>({
      defaultValues: {
        sport: { answer: "", weight: "" },
        whichSport: [],
        professionals: [],
        amateurs: [],
      },
      // resolver: yupResolver(schema)
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
    });
    reset(formData);

    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const selectedLevel = (item: IItem) => {
    const amateurs = watch().amateurs || [];
    const professionals = watch().professionals || [];
    const isAmatExist = amateurs.some((i) => item.name === i.name);
    const isProExist = professionals.some((i) => item.name === i.name);
    if (item.level?.answer === "Həvəskar" && !isAmatExist) {
      setValue("amateurs", [...amateurs, item]);
      if (isProExist) {
        setValue(
          "professionals",
          professionals.filter((i) => item.name !== i.name)
        );
      }
      console.log(amateurs);
    } else if (item.level?.answer === "Peşəkar" && !isProExist) {
      setValue("professionals", [...professionals, item]);
      if (isAmatExist) {
        setValue(
          "amateurs",
          amateurs.filter((i) => item.name !== i.name)
        );
      }
      console.log(item.level?.answer);

      console.log(watch().professionals);
    }
  };

  const questions = questionsData?.[0]?.questions;
  const inputProps = [
    { register: register("sport") },
    { register: register("whichSport") },
  ];
  console.log(formData);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      <div className="space-y-7 ">
        <div className="space-y-2">
          <label className="pl-2">{questions?.[0]?.question_title}*</label>

          <div className="flex gap-5">
            <Radio
              options={questions?.[0]?.answers}
              value={formData?.sport}
              register={inputProps[0].register}
            />
          </div>
        </div>

        {formData?.sport.answer === "Bəli" && (
          <>
            <SelectMult
              placeholder="Idman Secimi"
              label={`${questions?.[1]?.question_title}*`}
              options={questions?.[1]?.answers}
              register={inputProps[1].register}
              value={formData?.whichSport}
            />
            <div className="pr-2 max-h-[230px] overflow-y-auto">
              <label>{questions?.[2]?.question_title}</label>

              {formData?.whichSport?.map((item: string, index: number) => (
                <Fragment key={index}>
                  <SportLevels
                    item={item}
                    selectedLevel={selectedLevel}
                    questions={questions}
                    subStageSlug={subStageSlug}
                    index={index}
                  />
                </Fragment>
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
      {formData?.professionals.length === 0 ? (
        <LinkButton
          nav={{
            state: {
              stageName: nextStageNameCond,
              subStageName: nextSubStageNameCond,
            },
            path: {
              slugName: nextSlugNameCond,
              subSlugName: nextSubSlugNameCond,
            },
          }}
          label="Növbəti"
          className="absolute right-0 -bottom-20"
        />
      ) : (
        <LinkButton
          nav={{
            state: { stageName: nextStageName, subStageName: nextSubStageName },
            path: { slugName: nextSlugName, subSlugName: nextSubSlugName },
          }}
          label="Növbəti"
          className="absolute right-0 -bottom-20"
        />
      )}
    </form>
  );
};

export default SportForm;
