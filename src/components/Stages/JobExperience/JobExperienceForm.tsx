import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GeneralQuestionsFormProps } from '../Education/GeneralQuestionsForm';
import TextInput from '../../TextInput';
import DatePickerInput from '../../DatePickerInput';
import LinkButton from '../../LinkButton';
import DateInput from '../../DateInput';
import { useGetStageQuery } from '../../../services/stage';

export type JobExperienceValues = {
    company: string,
    profession: string,
    startDate: { id: number, answer: Date },
    endDate: { id: number, answer: Date },
}


const JobExperienceForm = ({ stageIndex, subStageSlug }: GeneralQuestionsFormProps) => {
    const { register, handleSubmit } = useForm<JobExperienceValues>({
        defaultValues: {
            company: "",
            profession: "",
            startDate: { id: 0, answer: new Date() },
            endDate: { id: 0, answer: new Date() },
        }
    });
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

    const inputProps = [
        { register: { ...register("company") } },
        { register: { ...register("profession") } },
        { register: { ...register("startDate") } },
        { register: { ...register("endDate") } },
    ];
    const onSubmit: SubmitHandler<JobExperienceValues> = (data) => console.log(data);

    return (
        <form className="mt-7 flex-col flex gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5 relative">
                <TextInput label='Hazırda çalışdığınız ixtisasınız hansıdır?*' type='text' placeholder='Product Manager' register={inputProps[0].register} />
                <TextInput label='Çalışdığınız müəssisənin adını qeyd edin.*' type='text' placeholder='QSS Analytics' register={inputProps[1].register} />
                <DateInput label='İşə başlama tarixi:' type='date' register={inputProps[2].register} />
                <DateInput label='İşdən ayrılma tarixi:' type='date' register={inputProps[3].register} />
                <label className='absolute right-0'>Hal hazırda çalışıram {' '}
                    <input type="checkbox"  />
                </label>
            </div>
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
