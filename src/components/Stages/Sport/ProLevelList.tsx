import { Icon } from "@iconify/react";
import Select from "components/Select";
import React, { Fragment } from "react";
import { useGetQuestionsQuery, useGetStageQuery } from "services/stage";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { updateStageForm } from "state/stages/stageFormSlice";
import { IItem, SportFormValues } from "./SportQuestionsForm";
import { GeneralQuestionsFormProps } from "../Education/GeneralQuestionsForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LinkButton from "components/LinkButton";
import { SportLevelValues } from "./components/SportLevels";
import ProLevel, { IProItem } from "./components/ProLevel";

const ProLevelList = ({
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
  } = stagesData?.[3] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[0] || {};

  const { slug: subSlugName } = stage_children?.[1] || {};
  const { slug: nextSubSlugName, stage_name: nextSubStageName } =
    nextStageChildren?.[0] || {};
  const {
    data: questionsData,
    error: questionsError,
    isLoading,
  } = useGetQuestionsQuery(subSlugName);

  const dispatch = useAppDispatch();

  const { formData: SportFormData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === prevSubSlugName
    ) as { formData: SportFormValues & any }) || ({} as any);

  const { register, watch, reset, handleSubmit, setValue } =
    useForm<SportFormValues>();
  const questions = questionsData?.[0]?.questions;
  const onSubmit: SubmitHandler<SportFormValues> = (data) => console.log(data);
  const handleRemoveItem = (item: IItem) => {
    const updatedProfessionals = SportFormData?.professionals.filter(
      (i: IItem) => i?.name !== item?.name
    );
    const newWhichSport = SportFormData?.whichSport?.filter(
      (el: any) => el !== item.name
    );
    dispatch(
      updateStageForm({
        name: prevSubSlugName as string,
        formData: {
          ...SportFormData,
          whichSport: newWhichSport,
          professionals: updatedProfessionals,
        },
      })
    );
    console.log("updated pros", updatedProfessionals);
  };

  console.log("pros onclick", SportFormData?.professionals);
  console.log("pros", SportFormData?.professionals);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      {SportFormData?.professionals?.map((item: any, index: number) => (
        <Fragment key={index}>
          <ProLevel
            item={item}
            index={index}
            handleRemoveItem={() => handleRemoveItem(item)}
            questions={questions}
            subStageSlug={prevSubSlugName}
            SportFormData={SportFormData}
          />
        </Fragment>
      ))}
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

export default ProLevelList;
