import Select from "components/Select";
import { IQuestionQuestion } from "types";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Radio from "components/RadioInput";
import TextInput from "components/TextInput";
import { Icon } from "@iconify/react";
type LanguangeAdd = {
  data: IQuestionQuestion[] | undefined;
  addLang: any;
  closeHandle: () => void;
  editData?: AddLangFormValues | undefined;
  editLang?: any;
};

const schema = yup
  .object({
    addLang: yup.object({
      id: yup.number(),
      answer: yup.string(),
    }),
    levelLang: yup.string().required(),
    haveCertLang: yup.string().required(),
    certLang: yup.string().required(),
  })
  .required();

export type AddLangFormValues = yup.InferType<typeof schema>;

const LanguangeAdd = ({
  data,
  addLang,
  editData,
  editLang,
  closeHandle,
}: LanguangeAdd) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddLangFormValues>({
    defaultValues: editData,
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleClick = () => (editLang ? editLang(watch()) : addLang(watch()));

  const inputProps = [
    { register: register("addLang") },
    { register: register("levelLang") },
    { register: register("haveCertLang") },
    { register: register("certLang") },
  ];

  return (
    <div onSubmit={onSubmit} className=" flex-col flex gap-5">
      <div className="space-y-3.5">
        <div className="space-y-2">
          <button
            onClick={closeHandle}
            className="bg-qss-input/75 w-fit rounded-full py-1 px-4 hover:bg-qss-input"
          >
            <Icon icon="akar-icons:arrow-back" className="text-xl" />
          </button>
          <div className="flex-1">
            <Select
              disabled={editData ? true : false}
              label={data?.[0].question_title || ""}
              options={data?.[0].answers}
              register={inputProps?.[0].register}
              value={watch()?.addLang?.answer}
            />
          </div>
        </div>
        {watch()?.addLang?.answer && (
          <>
            <div className="space-y-2">
              <label className="pl-2">
                {`${watch()?.addLang?.answer?.split(" ")[0]} ${
                  data?.[1].question_title
                }`}
                *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {data?.[1]?.answers?.map(({ answer_title, id }) => (
                  <Radio
                    key={id}
                    label={answer_title}
                    value={answer_title}
                    type="button"
                    register={inputProps[1].register}
                  />
                ))}
              </div>
            </div>
            <div>
              <label>
                {watch()?.addLang?.answer?.split(" ")[0]}{" "}
                {data?.[2].question_title}
              </label>
              <div className="flex gap-4 mt-2">
                {data?.[2].answers.map(({ id, answer_title }) => (
                  <Radio
                    key={id}
                    value={answer_title}
                    label={answer_title}
                    register={inputProps[2].register}
                  />
                ))}
              </div>
            </div>{" "}
            {watch()?.haveCertLang?.toLowerCase()?.includes("bəli") ? (
              <TextInput
                register={inputProps[3].register}
                label={`${watch()?.addLang?.answer?.split(" ")[0]} ${
                  data?.[3].question_title
                }`}
              />
            ) : null}
          </>
        )}

        {watch()?.addLang && watch()?.haveCertLang && watch()?.levelLang && (
          <button
            type="button"
            onClick={handleClick}
            className=" bg-qss-input px-12 py-2.5 items-center gap-1 font-medium text-base flex mx-auto rounded-full"
          >
            Yadda saxla
            <Icon icon="ic:round-done" className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguangeAdd;
