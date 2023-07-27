import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";

import LinkButton from "../../../LinkButton";
import Radio from "../../../RadioInput";
import Select from "../../../Select";
import TextInput from "../../../TextInput";

import { IQuestionQuestion } from "../../../../types";

const schema = yup
  .object({
    id: yup.string().required(),
    country: yup.object({ answer: yup.string(), weight: yup.string() }),
    university: yup.object({ answer: yup.string(), weight: yup.string() }),
    specialty: yup.object({ answer: yup.string(), weight: yup.string() }),
    date: yup.object({ start: yup.string(), end: yup.string() }),
    criteria: yup.object({ answer: yup.string(), weight: yup.string() }),
    local: yup.object({
      examName: yup.string(),
      score: yup.string(),
      maxScore: yup.string(),
    }),
    application: yup.object({ answer: yup.string(), weight: yup.string() }),
  })
  .required();

export type AddEduFormValues = yup.InferType<typeof schema>;

const EducationAdd = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddEduFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      {/* 
    Example:
    
    <Select
          label={questions?.[0]?.question_title}
          options={questions?.[0]?.answers}
          value={formData?.vocationalScore}
          register={register("vocationalScore")}
        /> */}
    </div>
  );
};

export default EducationAdd;
