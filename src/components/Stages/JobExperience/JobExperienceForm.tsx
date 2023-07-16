import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GeneralQuestionsFormProps } from '../Education/GeneralQuestionsForm';
import LinkButton from '../../LinkButton';
import { useGetQuestionsQuery, useGetStageQuery } from '../../../services/stage';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { updateStageForm } from '../../../state/stages/stageFormSlice';
import removeIcon from "../../../assets/Vector.svg"
import { Icon } from '@iconify/react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import ExperienceAdd, { AddExpFormValues } from './ExperienceAdd';

const schema = yup.object({
    experiences: yup.array().required()
})
export type JobExperienceValues = yup.InferType<typeof schema>;

export interface JobExperienceListItemProps {
    item: JobExperienceValues;
    index: number;
}

const JobExperienceForm = ({ stageIndex, subStageSlug }: GeneralQuestionsFormProps) => {
    const handleAdd = (exp: JobExperienceValues) => {
        const data = formData?.experiences;
        setValue("experiences", [...data, exp])
        setIsAdding(false)
        setDisplayRadio(false)
    }
    const [isAdding, setIsAdding] = useState(true);
    const [isEditing, setIsEditing] = useState<{
        edit: boolean;
        data?: AddExpFormValues;
    }>({ edit: false });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const closeHandle = () => {
        setIsAdding(false);
        setIsEditing({ edit: false });
    };

    const editExp = (editExpData: AddExpFormValues) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const data = formData?.experiences;
        const editedData = data?.map((exp: AddExpFormValues, index: number) => {
            if (index === editingIndex) {
                return editExpData;
            }
            return exp;
        });

        setValue("experiences", editedData);
        setIsEditing({ edit: false });
        setEditingIndex(null);
    };

    const handleRemove = (expIndex: number) => {
        const filterData = formData?.experiences?.filter(
            (_, index) => index !== expIndex
        );

        setValue("experiences", filterData);
    };

    const handleEdit = (expIndex: number) => {
        const data = formData?.experiences?.[expIndex] as AddExpFormValues;
        setEditingIndex(expIndex);
        setIsEditing({ edit: true, data });
    };




    const {  handleSubmit, reset, watch, setValue,register } = useForm<JobExperienceValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                experiences: []
            }
        });

    const onSubmit: SubmitHandler<JobExperienceValues> = (data) => {
        console.log(data)
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
    const [displayRadio, setDisplayRadio] = useState(true);

    return (
        <form className="mt-5 flex-col flex gap-5" onSubmit={handleSubmit(onSubmit)}>
            {isAdding ?
                (<ExperienceAdd data={questions} addExp={handleAdd} closeHandle={closeHandle} displayRadio={displayRadio} setDisplayRadio={setDisplayRadio} isAdding={isAdding} setIsAdding={setIsAdding} />) :
                isEditing?.edit ?
                    (<ExperienceAdd data={questions} addExp={handleAdd} editExp={editExp} closeHandle={closeHandle} editData={isEditing?.data} setIsEditing={setIsEditing} displayRadio={displayRadio} />) :
                    (
                        <>
                            <ul className='mt-8'>
                                {formData?.experiences.map((exp: AddExpFormValues, index: number) => (
                                    // eslint-disable-next-line react/prop-types
                                    <li key={index} className='p-2.5 border rounded-full flex justify-evenly items-center m-2 relative'>
                                        <div className="info w-48 flex">
                                            <span>{index + 1}. </span>
                                            <span> {exp.company}, {exp.profession}</span>
                                        </div>
                                        <div className='separator absolute h-full w-px right-64'></div>
                                        <div className="dates w-40 flex justify-center">
                                            {exp.startDate.split('-').reverse().join('/').slice(3)}  {exp.endDate && `-  ${exp.endDate?.split('-').reverse().join('/').slice(3)}`}
                                        </div>
                                        <div className='separator absolute h-full w-px right-20'></div>
                                        <div className="edit" onClick={() => handleEdit(index)} >
                                            <Icon
                                                icon="fluent:pen-16-regular"
                                                className="cursor-pointer text-2xl text-[#ADADAD] hover:text-gray-600"
                                            />

                                        </div>
                                        <div className="remove cursor-pointer">
                                            <img src={removeIcon} alt="remove" onClick={() => {formData?.experiences.length===1 && setIsAdding(true), handleRemove(index)}} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button className='add py-2 px-4 w-72 h-12 m-auto rounded-2xl flex justify-evenly items-center mt-5' onClick={() => setIsAdding(true)}>Yeni iş yeri əlavə et +</button>
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

    )
}

export default JobExperienceForm

