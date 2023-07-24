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
    setChooseLang?:any
}

const schema = yup
    .object({
        id: yup.string(),
        language: yup.object({ id: yup.number(), answer: yup.string() }),
        langCert: yup.string().required(),
        engLangCert: yup.string().required(),
        langCertName: yup.string().required(),
        langCertResult: yup.string().required(),
        ieltsResult: yup.object({ id: yup.number(), answer: yup.string() }),
        toeflResult: yup.object({ id: yup.number(), answer: yup.string() }),
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
        formState: { errors },
    } = useForm<AddLangFormValues>({
        defaultValues: editData,
        resolver: yupResolver(schema),
    });
    const inputProps = [
        { register: register("language") },
        { register: register("langCert") },
        { register: register("engLangCert") },
        { register: register("langCertName") },
        { register: register("langCertResult") },
        { register: register("ieltsResult") },
        { register: register("toeflResult") },
        { register: register("langLevel") },

    ];
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    const handleClick = () => {
        editLang ?
            editLang(watch())
            :
            addLang(watch());


    }

    return (
        <>
            <>
             <img src={back} alt="go back" className=' w-8 h-6' onClick={() => setChooseLang(false)} />
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
                                                                register={inputProps[7].register}
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
                                    {watch().engLangCert === "0" &&
                                        <Select label={data?.[5]?.question_title}
                                            options={data?.[5]?.answers}
                                            register={inputProps[5].register}
                                            value={watch().ieltsResult?.answer} />
                                    }
                                    {watch().engLangCert === "1" &&
                                        <Select label={data?.[6]?.question_title}
                                            options={data?.[6]?.answers}
                                            register={inputProps[6].register}
                                            value={watch().toeflResult?.answer} />
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
                                                                register={inputProps[7].register}
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
                                     <Radio
                                         key={id}
                                         label={answer_title}
                                         value={answer_title}
                                         register={inputProps[7].register}
                                         spanClassName='text-sm'
                                     />
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
