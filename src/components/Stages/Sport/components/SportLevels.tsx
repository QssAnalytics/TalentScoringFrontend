import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import Radio from "components/RadioInput";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { updateStageForm } from "state/stages/stageFormSlice";
import * as yup from "yup";
import { IItem, SportFormValues } from "../SportQuestionsForm";

export type SportLevelProps = {
  questions?: any;
  subStageSlug?: any;
  index: number;
  item: string;
  key?: any;
  selectedLevel?: any;
};

const schema = yup
  .object({
    name: yup.string().required(),
    level: yup
      .object({
        answer: yup.string().required(),
        weight: yup.string().required(),
      })
      .required(),
  })
  .required();

export type SportLevelValues = yup.InferType<typeof schema>;

const SportLevels = ({
  questions,
  subStageSlug,
  item,
  index,
  selectedLevel,
}: SportLevelProps) => {
  const dispatch = useAppDispatch();

  const { formData } =
    (useAppSelector((state) => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: SportLevelValues & any }) || ({} as any);
  const { register, handleSubmit, watch, setValue, reset } = useForm<SportLevelValues>(
    {
      resolver: yupResolver(schema),
    }
  );



  const handleRemove = async (item: string) => {
    const newWhichSport = formData?.whichSport?.filter(
      (el: any) => el !== item
    );
    const newProfessionals = formData?.professionals.filter((i: IItem) => {
      return i.name !== item;
    });
    const newAmateurs = formData?.amateurs.filter((i: IItem) => {
      return i.name !== item;
    });



    dispatch(
      updateStageForm({
        name: subStageSlug,
        formData: {
          ...formData,
          whichSport: newWhichSport,
          professionals: newProfessionals,
          amateurs: newAmateurs,
        },
      })
    );
  };

  useEffect(() => {
    setValue("name", item);
    selectedLevel(watch());
  }, [watch('level'), watch('name')])


  return (
    <div className="p-2.5 relative flex gap-4 " key={index}>
      <span className="bg-qss-input cursor-pointer relative py-2 max-w-[142px] w-full justify-center items-center flex rounded-full px-4 gap-2">
        <span>{item}</span>
        <Icon
          icon="typcn:delete-outline"
          className="cursor-pointer text-2xl text-[#EE4A4A]/75 hover:text-[#EE4A4A]"
          onClick={() => handleRemove(item)}
        />
      </span>
      <Radio
        options={questions?.[2]?.answers}
        value={
          formData?.amateurs?.find(
            ({ name }: { name: string }) => name === item
          )?.level ||
          formData?.professionals?.find(
            ({ name }: { name: string }) => name === item
          )?.level
        }
        register={register("level")}
      />
    </div>
  );
};

export default SportLevels;
