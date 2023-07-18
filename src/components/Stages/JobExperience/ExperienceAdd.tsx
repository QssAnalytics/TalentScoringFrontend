import Select from "../../../components/Select";
import { IQuestionQuestion } from "../../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Radio from "../../../components/RadioInput";
import TextInput from "../../../components/TextInput";
import ok from '../../../assets/ok.svg';
import DateInput from "../../DateInput";
import { useState } from "react";
type ExperienceAdd = {
    data: IQuestionQuestion[] | undefined;
    addExp: any;
    closeHandle: () => void;
    editData?: AddExpFormValues | undefined;
    editExp?: any;
    displayRadio: any;
    isAdding?: any;
    setIsAdding?: any
    setDisplayRadio?: any
    setIsEditing?: any;
};

const schema = yup
    .object({
        id: yup.string(),
        haveExperience: yup.string().required(),
        company: yup.string().required(),
        profession: yup.string().required(),
        workingActivityForm: yup.object({ id: yup.number(), answer: yup.string() }),
        degreeOfProfes: yup.object({ id: yup.number(), answer: yup.string() }),
        startDate: yup.string().required(),
        endDate: yup.string(),
        currentWorking: yup.boolean(),
    })
    .required();

export type AddExpFormValues = yup.InferType<typeof schema>;


const ExperienceAdd = ({
    data,
    addExp,
    editData,
    editExp,
    displayRadio,
    setDisplayRadio,
    isAdding,
    setIsAdding,
    setIsEditing,
}: ExperienceAdd) => {
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AddExpFormValues>({
        defaultValues: editData,
        resolver: yupResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });



    const handleClick = () => {
        editExp ?
            editExp(watch()) :
            addExp(watch());

    }
    const inputProps = [
        { register: { ...register("haveExperience") } },
        { register: { ...register("company") } },
        { register: { ...register("profession") } },
        { register: { ...register("workingActivityForm") } },
        { register: { ...register("degreeOfProfes") } },
        { register: { ...register("startDate") } },
        { register: { ...register("endDate") } },
        { register: {...register("currentWorking")}}
    ];

    return (
        <div className="relative flex flex-col gap-2" onSubmit={onSubmit}>
            {displayRadio &&
                <div className="space-y-2">
                    <label className="pl-2">
                        {data?.[0].question_title}
                    </label>
                    <div className="flex gap-5">
                        {data?.[0]?.answers?.map(
                            ({ answer_title, id }, idx) => (
                                <Radio
                                    key={id}
                                    label={answer_title}
                                    value={idx}
                                    register={inputProps[0].register}
                                />
                            ))}
                    </div>
                </div>
            }
            {(displayRadio ? watch()?.haveExperience === "0" : true) &&
                <>
                    <TextInput label='Çalışdığınız müəssisənin adını qeyd edin.*' type='text' placeholder='QSS Analytics' register={inputProps[1].register} />
                    <TextInput label='Vəzifənizi qeyd edin.*' type='text' placeholder='Product Manager' register={inputProps[2].register} />
                    <div className="flex gap-2.5">
                        <Select label={'Əmək fəaliyyət forması:'} options={data?.[3].answers} register={inputProps[3].register} value={watch()?.workingActivityForm?.answer} />
                        <Select label={'Peşəkarlıq dərəcəsi:'} options={data?.[4].answers} register={inputProps[4].register} value={watch()?.degreeOfProfes?.answer} />
                    </div>
                    <div className="flex gap-2.5">
                        <DateInput label='İşə başlama tarixi:' type='date' register={inputProps[5].register} />
                        <DateInput label='İşdən ayrılma tarixi:' type='date' register={inputProps[6].register} disabled={watch()?.currentWorking === true ? true : false} />
                    </div>
                    <label className='self-end'>Hal hazırda çalışıram {' '}
                        <input type="checkbox" onClick={()=>setValue("endDate"," currently working")} {...inputProps[7].register}   />
                    </label>
                    <button className='save py-2 px-4 w-40 h-10 rounded-2xl flex justify-evenly self-center' type="button" onClick={handleClick}><span> Yadda saxla </span><img src={ok} alt="ok" /></button>
                    {!displayRadio && <button className='save py-2 px-4 w-40 h-10 rounded-2xl flex justify-evenly self-center bg-qss-secondary text-white' onClick={() => { isAdding ? setIsAdding() : setIsEditing() }}>Siyahıya bax</button>}
                </>
            }
        </div>
    );
};

export default ExperienceAdd;