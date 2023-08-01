import { Icon } from '@iconify/react';
import Select from 'components/Select';
import React from 'react'
import { useGetQuestionsQuery, useGetStageQuery } from 'services/stage';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { updateStageForm } from 'state/stages/stageFormSlice';
import { SportFormValues } from './SportQuestionsForm';
import { GeneralQuestionsFormProps } from '../Education/GeneralQuestionsForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LinkButton from 'components/LinkButton';


const ProLevelList = ({ stageIndex, subStageSlug }: GeneralQuestionsFormProps) => {
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

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: SportFormValues & any }) || ({} as any)

  const { formData: SportFormData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === prevSubSlugName
    ) as { formData: SportFormValues & any }) || ({} as any)

  console.log(SportFormData)
  const { register, watch, reset, handleSubmit } = useForm<
    SportFormValues
  >();
  const questions = questionsData?.[0]?.questions;
  console.log(SportFormData)

  const onSubmit: SubmitHandler<SportFormValues> = (data) => console.log(data);
  const professionals = SportFormData?.professionals || [];
  const handleRemoveItem = (index: number) => {
    const updatedProfessionals = professionals.filter(( i:number) => i !== index);
    dispatch(
      updateStageForm({
        name: subStageSlug,
        formData: {
          ...formData,
          professionals: updatedProfessionals,
        },
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-7 flex-col flex gap-5"
    >
      {SportFormData?.professionals?.map((item: any, index: number) => (
        <div
          className=" border rounded-xl border-[#D8D8D8] p-2.5 mb-5 relative"
          key={index}
        >
          <div className="flex justify-between">
            <label>
              <span className="text-qss-secondary font-semibold">
                {item.name}
              </span>{" "}
              {questions?.[0]?.question_title}
            </label>
            <Icon
              icon="typcn:delete-outline"
              className="cursor-pointer text-2xl text-[#EE4A4A]/75 hover:text-[#EE4A4A]"
              onClick={() => handleRemoveItem(index)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Select
                label={``}
                options={questions?.[0]?.answers.slice(0, 4)}
                register={register(`professionals.${index}.whichScore`)}
                value={item.whichScore?.answer}
              />
            </div>
            <div className="col-span-1 ">
              <Select
                label={``}
                options={questions?.[0]?.answers.slice(4, 8)}
                register={register(`professionals.${index}.whichPlace`)}
                value={item.whichPlace?.answer}

              />
            </div>
          </div>
        </div>
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

  )
}


export default ProLevelList
