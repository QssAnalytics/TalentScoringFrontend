import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import Radio from 'components/RadioInput';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { updateStageForm } from 'state/stages/stageFormSlice';
import * as yup from 'yup';
import { IItem, SportFormValues } from '../SportQuestionsForm';

export type SportLevelProps = {
    questions?: any;
    subStageSlug?: any;
    index?: number;
    item?: any
    key?: any
    selectedLevel?: any
}

const staticAnswers = [
    {
        id: 0,
        answer_title: "Heveskar",
        answer_weight: null
    }
    , {
        id: 1,
        answer_title: "Pesekar",
        answer_weight: null
    }
]

const schema = yup
    .object({
        name: yup.string().required(),
        level: yup.object({
            answer: yup.string().required(),
            weight: yup.string().required()
        })
            .required(),
    })
    .required();

export type SportLevelValues = yup.InferType<typeof schema>;


const SportLevels = ({ questions, subStageSlug, item, key, selectedLevel }: SportLevelProps) => {

    const dispatch = useAppDispatch();

    const { formData } =
        (useAppSelector((state) => state.stageForm)?.find(
            ({ name }) => name === subStageSlug
        ) as { formData: SportLevelValues & any }) || ({} as any);
    const { register, handleSubmit, watch, setValue } = useForm<
        SportLevelValues
    >({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        selectedLevel(watch())
        setValue("name", item)
    }, [watch("level"), item])
    console.log(watch())
    console.log(formData);

    return (

        <div
            className="p-2.5 relative flex gap-4 "
            key={key}
        >
            <span className="bg-qss-input cursor-pointer relative py-2 max-w-[142px] w-full justify-center items-center flex rounded-full px-4 gap-2">
                <span>{item}</span>
                <Icon
                    icon="typcn:delete-outline"
                    className="cursor-pointer text-2xl text-[#EE4A4A]/75 hover:text-[#EE4A4A]"
                    onClick={() => {
                        const newWhichSport = formData?.whichSport?.filter(
                            (el: any) => el !== item
                        );
                        const newProfessionals = formData?.professionals.filter((i: IItem) => {
                                i.name !== item.name
                        })

                        const newAmateurs = formData?.amateurs.filter((i: IItem) => {
                                i.name !== item.name
                        })
                        dispatch(
                            updateStageForm({
                                name: subStageSlug,
                                formData: {
                                    ...formData,
                                    whichSport: newWhichSport,
                                    professionals: newProfessionals,
                                    amateurs: newAmateurs
                                },
                            })
                        );
                    }}
                />
            </span>
            <Radio
                options={staticAnswers}
                value={watch().level}
                register={register("level")}
            />

        </div>
    )
}

export default SportLevels
