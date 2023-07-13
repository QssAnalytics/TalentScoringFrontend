import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GeneralQuestionsFormProps } from '../Education/GeneralQuestionsForm';
import TextInput from '../../TextInput';
import LinkButton from '../../LinkButton';
import DateInput from '../../DateInput';
import { useGetQuestionsQuery, useGetStageQuery } from '../../../services/stage';
import ok from '../../../assets/ok.svg';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import Radio from '../../RadioInput';
import Select from '../../Select';
import { updateStageForm } from '../../../state/stages/stageFormSlice';
import removeIcon from "../../../assets/Vector.svg"
import { add, remove,edit } from './jobExperienceFormSlice';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';


export type JobExperienceValues = {
    id: string;
    haveExperience: string,
    company: string,
    profession: string,
    workingActivityForm: { id: number, answer: string },
    degreeOfProfes: { id: number, answer: string },
    startDate: string,
    endDate: string,
    currentWorking: boolean,
}
export interface JobExperienceListProps {
    items: JobExperienceValues[];
}
export interface JobExperienceListItemProps {
    item: JobExperienceValues;
    index: number;
}


const JobExperienceForm = ({ stageIndex, subStageSlug }: GeneralQuestionsFormProps) => {
    const experiences = useAppSelector((state) => state.experiences)
    const handleAddExp = (exp: JobExperienceValues) => {
        setIsEditing(false)
        const newExperience = { ...exp, id: uuidv4(), startDate: exp.startDate.toString(), endDate: exp.endDate.toString() }
        dispatch(add(newExperience))
        reset()
        setDisplayList(false)
    }

    const backToAdd=()=>{
        setIsEditing(false)
        reset()
        setDisplayList(false)
    }

    const handleRemove = (id: string) => {
        dispatch(remove(id))
    }

    const handleEdit = (id: string, exp: JobExperienceValues) => {
        setIsEditing(true);
        dispatch(edit(exp)); 
        reset(exp); 
        setDisplayList(false); 
      };
      
    const [displayList, setDisplayList] = useState(false)
    const [displayRadio, setDisplayRadio] = useState(true);
    const [ isEditing, setIsEditing ] = useState(false);
    const JobExperienceListItem: React.FC<JobExperienceListItemProps> = ({ item, index }) => (

        <li className='p-2.5 border rounded-full flex justify-evenly items-center m-2 relative'>
            <div className="info w-48 flex">
                <span>{index}. </span>
                <span> {item.company}, {item.profession}</span>
            </div>
            <div className='separator absolute h-full w-px right-64'></div>
            <div className="dates w-40 flex justify-center">
                {item.startDate.split('-').reverse().join('/').slice(3)}  {item.endDate && `-  ${item.endDate.split('-').reverse().join('/').slice(3)}`}
            </div>
            <div className='separator absolute h-full w-px right-20'></div>
            <div className="edit" onClick={() => handleEdit(item.id, item)}>
                <Icon
                    icon="fluent:pen-16-regular"
                    className="cursor-pointer text-2xl text-[#ADADAD] hover:text-gray-600"
                />
            </div>
            <div className="remove cursor-pointer">
                <img src={removeIcon} alt="remove" onClick={() => handleRemove(item.id)} />
            </div>
        </li>

    );

    const JobExperienceList = ({ items }: JobExperienceListProps) => (
        <>
            <ul className='mt-8'>
                {items.map((item, index) => (
                    // eslint-disable-next-line react/prop-types
                    <JobExperienceListItem key={item.id} index={index + 1} item={item} />
                ))}
            </ul>
            <button className='add py-2 px-4 w-72 h-12 m-auto rounded-2xl flex justify-evenly items-center mt-5' onClick={()=>backToAdd()}>Yeni iş yeri əlavə et +</button>

        </>
    )

    const JobExperienceMain = () =>{
        return (
            <form className="mt-5 flex-col flex gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex flex-col gap-2">
                    {displayRadio &&
                        <div className="space-y-2">
                            <label className="pl-2">
                                {questions?.[0].question_title}
                            </label>
                            <div className="flex gap-5">
                                {questions?.[0]?.answers?.map(
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
                    {(formData?.haveExperience === "0" || !displayRadio) &&
                        <>
                            <TextInput label='Çalışdığınız müəssisənin adını qeyd edin.*' type='text' placeholder='QSS Analytics' register={inputProps[1].register} />
                            <TextInput label='Vəzifənizi qeyd edin.*' type='text' placeholder='Product Manager' register={inputProps[2].register}  />
                            <div className="flex gap-2.5">
                                <Select label={'Əmək fəaliyyət forması:'} options={questions?.[3].answers} register={inputProps[3].register} value={formData?.workingActivityForm?.answer} />
                                <Select label={'Peşəkarlıq dərəcəsi:'} options={questions?.[4].answers} register={inputProps[4].register} value={formData?.degreeOfProfes?.answer} />
                            </div>
                            <div className="flex gap-2.5">
                                <DateInput label='İşə başlama tarixi:' type='date' register={inputProps[5].register} />
                                <DateInput label='İşdən ayrılma tarixi:' type='date' register={inputProps[6].register} disabled={formData?.currentWorking === true ? true : false} />
                            </div>
                            <label className='self-end'>Hal hazırda çalışıram {' '}
                                <input type="checkbox" {...register("currentWorking")} />
                            </label>
                            <button className='save py-2 px-4 w-40 h-10 rounded-2xl flex justify-evenly self-center' type='submit'><span> Yadda saxla </span><img src={ok} alt="ok" /></button>
                            {!displayRadio && <button className='save py-2 px-4 w-40 h-10 rounded-2xl flex justify-evenly self-center bg-qss-secondary text-white' onClick={() => setDisplayList(true)}>Siyahıya bax</button>}
                        </>
                    }
                </div>
            </form>
        )
     }
    
    
    const { register, handleSubmit, reset, watch } = useForm<JobExperienceValues>(
        {
            defaultValues: {
                id: "",
                haveExperience: "",
                company: "",
                profession: "",
                workingActivityForm: { id: 0, answer: "" },
                degreeOfProfes: { id: 0, answer: "" },
                startDate: "",
                endDate: "",
                currentWorking: false,
            }
        });

    const onSubmit: SubmitHandler<JobExperienceValues> = (data) => {
        if (isEditing) {
            handleEdit(data.id, data); 
            setDisplayList(true)
          } else {
            setDisplayRadio(false);
            handleAddExp(data); 
            reset();
            setDisplayList(true);
          }
        
    }

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
    } = stagesData?.[3] || {};

    const { slug: prevSubSlugName, stage_name: prevSubStageName } =
        prevStageChildren?.[0] || {};

    const { slug: subSlugName } = stage_children?.[0] || {};

    const { slug: nextSubSlugName, stage_name: nextSubStageName } =
        nextStageChildren?.[0] || {};

    const {
        data: questionsData,
        error: questionsError,
        isLoading,
    } = useGetQuestionsQuery(subSlugName);

    const questions = questionsData?.[0]?.questions;


    const dispatch = useAppDispatch();

    const { formData } =
        (useAppSelector((state) => state.stageForm)?.find(
            ({ name }) => name === subStageSlug
        ) as { formData: JobExperienceValues }) || {};

    const inputProps = [
        { register: { ...register("haveExperience") } },
        { register: { ...register("company") } },
        { register: { ...register("profession") } },
        { register: { ...register("workingActivityForm") } },
        { register: { ...register("degreeOfProfes") } },
        { register: { ...register("startDate") } },
        { register: { ...register("endDate") } },
    ];
    useEffect(() => {
        const subscription = watch((value) => {
            console.log(value);
            dispatch(
                updateStageForm({
                    name: subStageSlug,
                    formData: value as JobExperienceValues,
                })
            );
        });

        reset(formData);

        return () => subscription.unsubscribe();
    }, [subStageSlug, watch]);


    return (
        <>
            {!displayList ? JobExperienceMain() :
                <JobExperienceList items={experiences.items} />}
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

        </>

    )
}

export default JobExperienceForm
