import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGetQuestionsQuery,
  useGetStageQuery,
} from "../../../services/stage";
import Radio from "../../RadioInput";
import LinkButton from "../../LinkButton";
import { updateStageForm } from "../../../state/stages/stageFormSlice";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { GeneralQuestionsFormProps } from "../Education/GeneralQuestionsForm";
import removeIcon from "../../../assets/Vector.svg";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import LanguageAdd, { AddLangFormValues } from "./components/LanguageAdd";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  languageSkills: yup.array().required(),
  haveLanguageSkills: yup.object().required()
});

export type LanguageQuestionsFormValues = yup.InferType<typeof schema>;

const LanguageQuestionsForm = ({
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
  } = stagesData?.[0] || {};

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    prevStageChildren?.[stageIndex + 1] || {};

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
    ) as { formData: LanguageQuestionsFormValues }) || {};

  const { register, handleSubmit, watch, reset: ParentReset, setValue } =
    useForm<LanguageQuestionsFormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        languageSkills: [],
        haveLanguageSkills: {}
      },
    });

  const onSubmit: SubmitHandler<LanguageQuestionsFormValues> = (data) => {
    console.log(data);
  };

  const [isAdding, setIsAdding] = useState(true);
  const [isEditing, setIsEditing] = useState<{
    edit: boolean;
    data?: AddLangFormValues;
  }>({ edit: false });
  const [displayListButton, setDisplayListButton] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [chooseLang, setChooseLang] = useState(true);

  const handleAdd = (lang: LanguageQuestionsFormValues) => {
    const data = formData?.languageSkills;
    setValue("languageSkills", [...data, lang]);
    setIsAdding(false);
  };

  const handleRemove = (landIndex: number) => {
    const filterData = formData?.languageSkills?.filter(
      (_, index) => index !== landIndex
    );

    setValue("languageSkills", filterData);
  };
  const handleEdit = (langIndex: number) => {
    const data = formData?.languageSkills?.[langIndex] as AddLangFormValues;
    setEditingIndex(langIndex);
    setIsEditing({ edit: true, data });
  };

  const editLang = (editLangData: AddLangFormValues) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const data = formData?.languageSkills;
    const editedData = data?.map((lang: AddLangFormValues, index: number) => {
      if (index === editingIndex) {
        return editLangData;
      }
      return lang;
    });

    setValue("languageSkills", editedData);
    setIsEditing({ edit: false });
    setEditingIndex(null);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      // console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as LanguageQuestionsFormValues,
        })
      );
    });

    ParentReset(formData);

    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex-col flex gap-5 h-[460px] overflow-y-auto overflow-hidden"
    >
      {isAdding ? (
        <>
          <h3 className="pl-2">{questions?.[1].question_title}</h3>
          <div className="flex items-center relative">
            <LanguageAdd
              data={questions}
              addLang={handleAdd}
              setChooseLang={setChooseLang}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              displayListButton={displayListButton}
              formData={formData}
              parentReset={ParentReset}
            />
            {
              formData?.languageSkills?.length === 0 &&
              (<div className="">
                <div className="flex gap-5 w-48 py-2 px-4">
                  <Radio
                    value={watch('haveLanguageSkills')}
                    register={register('haveLanguageSkills')}
                    options={questions?.[0].answers}
                  />
                </div>
              </div>)
            }
          </div>
        </>
      ) : isEditing.edit ? (
        <LanguageAdd
          data={questions}
          addLang={handleAdd}
          editData={isEditing?.data}
          editLang={editLang}
          setChooseLang={setChooseLang}
          setIsEditing={setIsEditing}
          displayListButton={displayListButton}
        />
      ) : (
        <>
          <h3 className="pl-2">Əlavə xarici dil biliklərinizi qeyd edin</h3>
          <button
            className="add py-2 px-4 w-full h-12 rounded-2xl flex justify-evenly items-center"
            type="button"
            onClick={() => {
              setIsAdding(true), setDisplayListButton(true);
            }}
          >
            {" "}
            Əlavə et +{" "}
          </button>
          <div className="titles flex px-16 justify-start gap-16">
            <span>Dil</span>
            <span>Səviyyə</span>
            <span>Sertifikat</span>
          </div>
          <ul>
            {formData?.languageSkills?.map(
              (lang: AddLangFormValues, index: number) => (
                <li
                  key={index}
                  className="border flex-grow rounded-full flex justify-between items-center m-2 relative min-h-[46px] background"
                >
                  <div className="w-36 rounded-l-full flex items-center">
                    <div className="info flex gap-5 p-2.5 ">
                      <span>{index + 1}. </span>
                      <span> {lang.language?.answer}</span>
                    </div>
                  </div>
                  <div className="border-r">
                    <div className="level p-2.5">
                      {lang.langLevel?.answer?.substring(0, 2)}
                    </div>
                  </div>
                  <div className="w-48">
                    <div className="certificate py-2.5 px-1.5">
                      {lang.langCertName && lang.langCertResult && (
                        <>
                          {" "}
                          <span>{lang.langCertName}</span>{" "}
                          <span> {lang.langCertResult}</span>{" "}
                        </>
                      )}
                      {lang.engLangCert?.answer === "IELTS" && (
                        <p className="w-48">
                          {" "}
                          IELTS {lang.engCertResult?.answer}
                        </p>
                      )}
                      {lang.engLangCert?.answer === "TOEFL" && (
                        <p className="w-48">
                          {" "}
                          TOEFL {lang.engCertResult?.answer}
                        </p>
                      )}
                      {(lang.langCert?.answer === "1" || lang.engLangCert?.answer === "Sertifikat yoxdur") && (
                        <span>Sertifikat yoxdur </span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-r-full">
                    <div className="settings flex justify-around p-2.5 gap-2 w-20 h-full items-center">
                      <div className="edit" onClick={() => handleEdit(index)}>
                        <Icon
                          icon="fluent:pen-16-regular"
                          className="cursor-pointer text-2xl text-[#ADADAD] hover:text-gray-600"
                        />
                      </div>
                      <div className="remove cursor-pointer">
                        <img
                          src={removeIcon}
                          alt="remove"
                          onClick={() => {
                            formData?.languageSkills.length === 1 &&
                              setIsAdding(true),
                              handleRemove(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
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

export default LanguageQuestionsForm;
