import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { GeneralQuestionsFormProps } from "../Education/GeneralQuestionsForm";
import Select from "../../Select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "components/TextInput";
import Radio from "components/RadioInput";
import LanguangeAdd, { AddLangFormValues } from "./components/LanguangeAdd";
import { Icon } from "@iconify/react";
import { IQuestionQuestion } from "types";

const schema = yup.object({
  langs: yup.array().required(),
});

export type OptionalLanguangeQuestionsFormValues = yup.InferType<typeof schema>;

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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OptionalLanguangeQuestionsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      langs: [],
    },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<{
    edit: boolean;
    data?: AddLangFormValues;
  }>({ edit: false });

  const addLang = (lang: AddLangFormValues) => {
    const data = formData?.langs;
    setValue("langs", [...data, lang]);
    setIsAdding(false);
  };

  const editLang = (editLangData: AddLangFormValues) => {
    const data = formData?.langs;

    const editDataIndex = formData?.langs?.findIndex(
      (lang: AddLangFormValues) =>
        lang?.addLang?.answer === editLangData?.addLang?.answer
    );
    setValue("langs", [
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...data?.slice(0, editDataIndex),
      editLangData,
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...data?.slice(editDataIndex + 1),
    ]);
    setIsEditing({ edit: false });
  };

  const handleRemoveLang = (langIndex: number) => {
    const filterData = formData?.langs?.filter(
      (_, index) => index !== langIndex
    );

    setValue("langs", filterData);
  };

  const handleEditLang = (langIndex: number) => {
    const data = formData?.langs?.[langIndex] as AddLangFormValues;

    setIsEditing({ edit: true, data });
  };

  const closeHandle = () => {
    setIsAdding(false);
    setIsEditing({ edit: false });
  };

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
  const filteredQuestions =
    (questions &&
      questions?.length > 0 && [
        {
          ...questions[0],
          answers: questions?.[0]?.answers?.filter(
            (answer: { answer_title: string | undefined }) =>
              !formData.langs?.find(
                (lang?: AddLangFormValues) =>
                  lang?.addLang.answer === answer?.answer_title
              )
          ),
        },
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...questions?.slice(1),
      ]) ||
    undefined;

  return (
    <form onSubmit={onSubmit} className="mt-5 flex-col flex gap-3">
      {isAdding ? (
        <LanguangeAdd
          addLang={addLang}
          data={filteredQuestions}
          closeHandle={closeHandle}
        />
      ) : isEditing?.edit ? (
        <LanguangeAdd
          addLang={addLang}
          data={questions}
          closeHandle={closeHandle}
          editData={isEditing?.data}
          editLang={editLang}
        />
      ) : (
        <>
          <div>
            <label>Əlavə xarici dil biliklərinizi qeyd edin</label>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-qss-input px-12 py-2 mt-3 items-center gap-1 text-base flex w-full justify-center rounded-full"
            >
              Əlavə et +
            </button>
          </div>

          <div className="space-y-2 overflow-y-auto">
            {formData?.langs?.map((lang: AddLangFormValues, index: number) => (
              <div
                key={index}
                className="flex border p-1 items-center border-qss-base-200 gap-2 rounded-2xl"
              >
                <p className="bg-qss-input basis-1/4 text-center rounded-full whitespace-nowrap col-span-1 px-4 py-2">
                  {lang?.addLang?.answer}
                </p>

                <p className="bg-qss-input rounded-full px-4 py-2">
                  {lang?.levelLang?.split(" ")?.[0]}
                </p>

                <p className="truncate flex-1 bg-qss-input whitespace-nowrap rounded-full px-4 py-2">
                  {lang?.haveCertLang.includes("Bəli")
                    ? lang?.certLang
                    : "Məlumat yoxdur"}
                </p>

                <div className="flex gap-1">
                  <Icon
                    icon="fluent:pen-16-regular"
                    className="cursor-pointer text-2xl text-[#ADADAD] hover:text-gray-600"
                    onClick={() => handleEditLang(index)}
                  />
                  <Icon
                    icon="typcn:delete-outline"
                    className="cursor-pointer text-2xl text-[#EE4A4A]/75 hover:text-[#EE4A4A]"
                    onClick={() => handleRemoveLang(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
