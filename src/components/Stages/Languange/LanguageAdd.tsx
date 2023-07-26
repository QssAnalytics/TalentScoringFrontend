import React from 'react'
import * as yup from 'yup';
import LinkButton from '../../LinkButton';
import Radio from '../../RadioInput';
import Select from '../../Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IQuestionQuestion } from '../../../types';
import TextInput from '../../TextInput';
import ok from '../../../assets/ok.svg';
import back from "./../../../assets/ic_round-arrow-back.svg"

type LanguageAdd = {
    data: IQuestionQuestion[] | undefined;
    addLang?: any,
    editData?: AddLangFormValues | undefined;
    editLang?: any,
    setChooseLang?: any
}

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
    setChooseLang
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

        setValue("langLevel", handleLangLevel(watch("engCertResult.answer"), watch("langLevel")))

        editLang ?
            editLang(watch())
            :
            addLang(watch());



        console.log(handleLangLevel(watch("engCertResult.answer"), watch("langLevel")))
    }
    const handleLangLevel = (engCertResult: string | undefined, langLevel: string) => {
        switch (engCertResult) {
            case "4.0":
            case "4.5-5.0":
            case "32-45":
                langLevel = "B1"
                break;
            case "5.5":
            case "6.0":
            case "6.5":
            case "46-59":
            case "60-78":
            case "70-93":
                langLevel = "B2"
                break;
            case "7.0-7.5":
            case "94-109":
                langLevel = "C1"
                break;
            case "8.0-9.0":
            case "110-120":
                langLevel = "C2"
                break;
            case "31":
                langLevel = "A2"
                break;

            default:
                langLevel = langLevel?.substring(0, 2)
                break;
        }

        return langLevel
    }

    return (
        <>
            <>
                <img src={back} alt="go back" className='cursor-pointer w-8 h-6' onClick={() => setChooseLang(false)} />
                <Select
                    label={`${data?.[0]?.question_title}*`}
                    options={data?.[0]?.answers}
                    register={inputProps[0].register}
                    value={watch().language?.answer}
                />
                {watch()?.language?.answer &&
                    <>

                        {watch()?.language?.answer !== "Ingilis dili" ?
                            <>
                                <div className="space-y-2">
                                    <label className="pl-2">
                                        {watch()?.language?.answer?.replace(/\s+dili$/, '')} {data?.[2]?.question_title}*
                                    </label>

                                    <div className="flex gap-5 flex-wrap">
                                        {data?.[2]?.answers?.map(
                                            ({ answer_title, id }, idx) => (
                                                <Radio
                                                    key={id}
                                                    label={answer_title}
                                                    value={idx}
                                                    register={inputProps[1].register}
                                                    spanClassName='text-sm'
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                {watch().langCert === "0" &&
                                    <div className="space-y-2">
                                        <label className="pl-2">
                                            {data?.[3]?.question_title}
                                        </label>
                                        <div className="certificate flex gap-3">
                                            <TextInput inputClassName='w-3/5' register={inputProps[3].register} />
                                            <TextInput inputClassName='w-2/5' register={inputProps[4].register} />
                                        </div>
                                    </div>
                                }
                                <div className="space-y-2">
                                    <label className="pl-2">
                                        {watch()?.language?.answer?.replace(/\s+dili$/, '')} {data?.[1]?.question_title}*
                                    </label>

                                    <div className="flex gap-5 flex-wrap">
                                        {data?.[1]?.answers?.map(
                                            ({ answer_title, id }) => (
                                                <Radio
                                                    key={id}
                                                    label={answer_title}
                                                    value={answer_title}
                                                    register={inputProps[6].register}
                                                    spanClassName='text-sm'
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </> :
                            <>
                                <div className="space-y-2">
                                    <label className="pl-2">
                                        {data?.[4]?.question_title}*
                                    </label>

                                    <div className="flex gap-5 flex-wrap">
                                        {data?.[4]?.answers?.map(
                                            ({ answer_title, id }, idx) => (
                                                <Radio
                                                    key={id}
                                                    label={answer_title}
                                                    value={idx}
                                                    register={inputProps[2].register}
                                                    spanClassName='text-sm'
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {watch().engLangCert === "0" && <>
                                        <Select label={data?.[5]?.question_title}
                                            options={data?.[5]?.answers}
                                            register={inputProps[5].register}
                                            value={watch().engCertResult?.answer} />
                                    </>

                                    }
                                    {watch().engLangCert === "1" &&
                                        <Select label={data?.[6]?.question_title}
                                            options={data?.[6]?.answers}
                                            register={inputProps[5].register}
                                            value={watch().engCertResult?.answer} />
                                    }
                                    {watch().engLangCert === "3" &&
                                        <>
                                            <div className="space-y-2">
                                                <label className="pl-2">
                                                    {data?.[3]?.question_title}
                                                </label>
                                                <div className="certificate flex gap-3">
                                                    <TextInput inputClassName='w-3/5' register={inputProps[3].register} />
                                                    <TextInput inputClassName='w-2/5' register={inputProps[4].register} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="pl-2">
                                                    {watch()?.language?.answer?.replace(/\s+dili$/, '')} {data?.[1]?.question_title}*
                                                </label>

                                                <div className="flex gap-5 flex-wrap">
                                                    {data?.[1]?.answers?.map(
                                                        ({ answer_title, id }) => (
                                                            <Radio
                                                                key={id}
                                                                label={answer_title}
                                                                value={answer_title}
                                                                register={inputProps[6].register}
                                                                spanClassName='text-sm'
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>

                                    }
                                </div>
                            </>
                        }
                        {watch().engLangCert === "2" &&
                            <div className="space-y-2">
                                <label className="pl-2">
                                    {watch()?.language?.answer?.replace(/\s+dili$/, '')} {data?.[1]?.question_title}*
                                </label>

                                <div className="flex gap-5 flex-wrap">
                                    {data?.[1]?.answers?.map(
                                        ({ answer_title, id }) => (
                                            <>
                                                <Radio
                                                    key={id}
                                                    label={answer_title}
                                                    value={answer_title}
                                                    register={inputProps[6].register}
                                                    spanClassName='text-sm'
                                                />
                                            </>

                                        )
                                    )}
                                </div>
                            </div>
                        }

                        <button className='save py-2 px-4 w-40 h-10 rounded-2xl flex justify-evenly self-center' type="button" onClick={handleClick}><span> Yadda saxla </span><img src={ok} alt="ok" /></button>
                    </>
                }
            </>
        </>
    )
}

export default LanguageAdd
