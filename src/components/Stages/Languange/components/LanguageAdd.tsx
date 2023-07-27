import React from "react";
import * as yup from "yup";
import LinkButton from "../../../LinkButton";
import Radio from "../../../RadioInput";
import Select from "../../../Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IQuestionQuestion } from "../../../../types";
import TextInput from "../../../TextInput";
import { Icon } from "@iconify/react";

type LanguageAdd = {
  data: IQuestionQuestion[] | undefined;
  addLang?: any;
  editData?: AddLangFormValues | undefined;
  editLang?: any;
  setChooseLang?: any;
  isAdding?: any;
  setIsAdding?: any;
  setIsEditing?: any;
  displayListButton?: any;
};

const schema = yup
  .object({
    id: yup.string(),
    language: yup.object({ id: yup.number(), answer: yup.string() }),
    langCert: yup.string().required(),
    engLangCert: yup.string().required(),
    langCertName: yup.string().required(),
    langCertResult: yup.string().required(),
    engCertResult: yup.object({ id: yup.number(), answer: yup.string() }),
    langLevel: yup.string().required(),
  })
  .required();

export type AddLangFormValues = yup.InferType<typeof schema>;

const LanguageAdd = ({
  data,
  addLang,
  editData,
  editLang,
  setChooseLang,
  isAdding,
  setIsAdding,
  setIsEditing,
  displayListButton,
}: LanguageAdd) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddLangFormValues>({
    defaultValues: editData,
    // resolver: yupResolver(schema),
  });
  const inputProps = [
    { register: register("language") },
    { register: register("langCert") },
    { register: register("engLangCert") },
    { register: register("langCertName") },
    { register: register("langCertResult") },
    { register: register("engCertResult") },
    { register: register("langLevel") },
  ];
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleClick = () => {
    setValue(
      "langLevel",
      handleLangLevel(watch("engCertResult.answer"), watch("langLevel"))
    );

    editLang ? editLang(watch()) : addLang(watch());
  };
  const handleLangLevel = (
    engCertResult: string | undefined,
    langLevel: string
  ) => {
    switch (engCertResult) {
      case "4.0":
      case "4.5-5.0":
      case "32-45":
        langLevel = "B1";
        break;
      case "5.5":
      case "6.0":
      case "6.5":
      case "46-59":
      case "60-78":
      case "70-93":
        langLevel = "B2";
        break;
      case "7.0-7.5":
      case "94-109":
        langLevel = "C1";
        break;
      case "8.0-9.0":
      case "110-120":
        langLevel = "C2";
        break;
      case "31":
        langLevel = "A2";
        break;

      default:
        langLevel = langLevel?.substring(0, 2);
        break;
    }

    return langLevel;
  };

  return (
    <>
      <>
        <button
          onClick={() => setChooseLang(false)}
          className="bg-qss-input/75 w-fit rounded-full py-1 px-4 hover:bg-qss-input"
        >
          <Icon icon="akar-icons:arrow-back" className="text-xl" />
        </button>

        <Select
          label={`${data?.[0]?.question_title}*`}
          options={data?.[0]?.answers}
          register={inputProps[0].register}
          value={watch().language?.answer}
        />
        {watch()?.language?.answer && (
          <>
            {watch()?.language?.answer !== "Ingilis dili" ? (
              <>
                <div className="space-y-2">
                  <label className="pl-2">
                    {watch()?.language?.answer?.replace(/\s+dili$/, "")}{" "}
                    {data?.[2]?.question_title}*
                  </label>

                  <div className="flex gap-5 flex-wrap">
                    {data?.[2]?.answers?.map(({ answer_title, id }, idx) => (
                      <Radio
                        key={id}
                        label={answer_title}
                        value={idx}
                        register={inputProps[1].register}
                        spanClassName="text-sm"
                      />
                    ))}
                  </div>
                </div>
                {watch().langCert === "0" && (
                  <div className="space-y-2">
                    <label className="pl-2">{data?.[3]?.question_title}</label>
                    <div className="certificate flex gap-3">
                      <TextInput
                        inputClassName="w-3/5"
                        register={inputProps[3].register}
                      />
                      <TextInput
                        inputClassName="w-2/5"
                        register={inputProps[4].register}
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="pl-2">
                    {watch()?.language?.answer?.replace(/\s+dili$/, "")}{" "}
                    {data?.[1]?.question_title}*
                  </label>

                  <div className="flex gap-5 flex-wrap">
                    {data?.[1]?.answers?.map(({ answer_title, id }) => (
                      <Radio
                        key={id}
                        label={answer_title}
                        value={answer_title}
                        register={inputProps[6].register}
                        spanClassName="text-sm"
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="pl-2">{data?.[4]?.question_title}*</label>

                  <div className="flex gap-5 flex-wrap">
                    {data?.[4]?.answers?.map(({ answer_title, id }, idx) => (
                      <Radio
                        key={id}
                        label={answer_title}
                        value={idx}
                        register={inputProps[2].register}
                        spanClassName="text-sm"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  {watch().engLangCert === "0" && (
                    <>
                      <Select
                        label={data?.[5]?.question_title}
                        options={data?.[5]?.answers}
                        register={inputProps[5].register}
                        value={watch().engCertResult?.answer}
                      />
                    </>
                  )}
                  {watch().engLangCert === "1" && (
                    <Select
                      label={data?.[6]?.question_title}
                      options={data?.[6]?.answers}
                      register={inputProps[5].register}
                      value={watch().engCertResult?.answer}
                    />
                  )}
                  {watch().engLangCert === "3" && (
                    <>
                      <div className="space-y-2">
                        <label className="pl-2">
                          {data?.[3]?.question_title}
                        </label>
                        <div className="certificate flex gap-3">
                          <TextInput
                            inputClassName="w-3/5"
                            register={inputProps[3].register}
                          />
                          <TextInput
                            inputClassName="w-2/5"
                            register={inputProps[4].register}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="pl-2">
                          {watch()?.language?.answer?.replace(/\s+dili$/, "")}{" "}
                          {data?.[1]?.question_title}*
                        </label>

                        <div className="flex gap-5 flex-wrap">
                          {data?.[1]?.answers?.map(({ answer_title, id }) => (
                            <Radio
                              key={id}
                              label={answer_title}
                              value={answer_title}
                              register={inputProps[6].register}
                              spanClassName="text-sm"
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {watch().engLangCert === "2" && (
              <div className="space-y-2">
                <label className="pl-2">
                  {watch()?.language?.answer?.replace(/\s+dili$/, "")}{" "}
                  {data?.[1]?.question_title}*
                </label>

                <div className="flex gap-5 flex-wrap">
                  {data?.[1]?.answers?.map(({ answer_title, id }) => (
                    <>
                      <Radio
                        key={id}
                        label={answer_title}
                        value={answer_title}
                        register={inputProps[6].register}
                        spanClassName="text-sm"
                      />
                    </>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleClick}
              className=" bg-qss-input px-12 py-2.5 items-center gap-1 font-medium text-base flex mx-auto rounded-full"
            >
              Yadda saxla
              <Icon icon="ic:round-done" className="text-xl" />
            </button>
            {displayListButton && (
              <button
                className="save py-2 px-4 w-40 h-10 rounded-2xl flex justify-evenly self-center bg-qss-secondary text-white"
                onClick={() => {
                  isAdding ? setIsAdding() : setIsEditing();
                }}
              >
                Siyahıya bax
              </button>
            )}
          </>
        )}
      </>
    </>
  );
};

export default LanguageAdd;
