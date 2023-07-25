import { useEffect, useState } from "react";
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
import TextInput from "../../TextInput";
import removeIcon from "../../../assets/Vector.svg";
import SelectMult from "../../SelectMult";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import LanguageAdd, { AddLangFormValues } from "./LanguageAdd";

const schema = yup.object({
  languageSkills: yup.array().required(),
});
export type LanguangeQuestionsFormValues = yup.InferType<typeof schema>;

const LanguangeQuestionsForm = ({
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
    ) as { formData: LanguangeQuestionsFormValues }) || {};

  const { register, handleSubmit, watch, reset, setValue } =
    useForm<LanguangeQuestionsFormValues>({
      defaultValues: {
        languageSkills: [],
      },
    });

  const onSubmit: SubmitHandler<LanguangeQuestionsFormValues> = (data) =>
    console.log(data);
  const [isAdding, setIsAdding] = useState(true);
  const [isEditing, setIsEditing] = useState<{
    edit: boolean;
    data?: AddLangFormValues;
  }>({ edit: false });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [chooseLang, setChooseLang] = useState(false);
  const handleAdd = (lang: LanguangeQuestionsFormValues) => {
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
    const editedData = data?.map((exp: AddLangFormValues, index: number) => {
      if (index === editingIndex) {
        return editLangData;
      }
      return exp;
    });

    setValue("languageSkills", editedData);
    setIsEditing({ edit: false });
    setEditingIndex(null);
  };
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as LanguangeQuestionsFormValues,
        })
      );
    });

    reset(formData);

    return () => subscription.unsubscribe();
  }, [subStageSlug, watch]);

  if (isLoading) return <div>Loading...</div>;
  if (questionsError) return <div>Error</div>;

  const questions = questionsData?.[0]?.questions;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex-col flex gap-5"
    >
      {chooseLang === false ? (
        <>
          <h3 className="pl-2">Əlavə xarici dil biliklərinizi qeyd edin</h3>
          <div className=" flex items-center">
            <button
              className="add py-2 px-4 w-full h-12 rounded-2xl flex justify-evenly items-center"
              type="button"
              onClick={() => setChooseLang(true)}
            >
              {" "}
              Əlavə et +{" "}
            </button>
            <div className="space-y-2">
              <div className="flex gap-5 w-48 py-2 px-4">
                <Radio value="Yoxdur" label="Yoxdur" />
              </div>
            </div>
          </div>
        </>
      ) : isAdding ? (
        <LanguageAdd
          data={questions}
          addLang={handleAdd}
          setChooseLang={setChooseLang}
        />
      ) : isEditing.edit ? (
        <LanguageAdd
          data={questions}
          addLang={handleAdd}
          editData={isEditing?.data}
          editLang={editLang}
          setChooseLang={setChooseLang}
        />
      ) : (
        <>
          <h3 className="pl-2">Əlavə xarici dil biliklərinizi qeyd edin</h3>
          <button
            className="add py-2 px-4 w-full h-12 rounded-2xl flex justify-evenly items-center"
            type="button"
            onClick={() => setIsAdding(true)}
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
            {formData?.languageSkills.map(
              (lang: AddLangFormValues, index: number) => (
                <li
                  key={index}
                  className="border flex-grow rounded-full flex justify-between items-center m-2 relative min-h-[46px] background"
                >
                  <div className="w-36 rounded-l-full flex items-center">
                    <div className="info flex gap-5 p-2.5 ">
                      <span>{index + 1}. </span>
                      <span> {lang.language.answer}</span>
                    </div>
                  </div>
                  <div className="border-r">
                    <div className="level p-2.5">
                      {lang.ieltsResult?.answer === "4.0" ||
                      lang.ieltsResult?.answer === "4.5-5.0" ||
                      lang.toeflResult?.answer === "32-45" ? (
                        <span> B1 </span>
                      ) : lang.ieltsResult?.answer === "5.5" ||
                        lang.ieltsResult?.answer === "6.0" ||
                        lang.ieltsResult?.answer === "6.5" ||
                        lang.toeflResult?.answer === "46-59" ||
                        lang.toeflResult?.answer === "60-78" ||
                        lang.toeflResult?.answer === "70-93" ? (
                        <span> B2 </span>
                      ) : lang.ieltsResult?.answer === "7.0-7.5" ||
                        lang.toeflResult?.answer === "94-109" ? (
                        <span> C1 </span>
                      ) : lang.ieltsResult?.answer === "8.0-9.0" ||
                        lang.toeflResult?.answer === "110-120" ? (
                        <span> C2 </span>
                      ) : lang.toeflResult?.answer === "31" ? (
                        <span> A2 </span>
                      ) : (
                        <span>{lang.langLevel?.substring(0, 2)}</span>
                      )}
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
                      {lang.ieltsResult?.answer && (
                        <p className="w-48"> IELTS {lang.ieltsResult.answer}</p>
                      )}
                      {lang.toeflResult?.answer && (
                        <p className="w-48"> TOEFL {lang.toeflResult.answer}</p>
                      )}
                      {(lang.langCert === "1" || lang.engLangCert === "2") && (
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

export default LanguangeQuestionsForm;
