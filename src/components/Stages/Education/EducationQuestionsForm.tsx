import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useGetDependQuestionsQuery,
  useGetStageQuery
} from '../../../services/stage'
import TextInput from '../../TextInput'
import LinkButton from '../../LinkButton'
import { updateStageForm } from '../../../state/stages/stageFormSlice'
import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  vocationalScore: Yup.string()
    .required('Xana boş buraxılmamalıdı') 
    .max(2, 'Maxsimum dəyər 50 olmalıdı')
    .test(
      'maxValue',
      'Maxsimum dəyər 50 olmalıdı',
      (value) => value === null || parseInt(value) <= 50 
    ),
  bachelorsScore: Yup.string()
    .required('Xana boş buraxılmamalıdı') 
    .max(3, 'Maxsimum dəyər 700 olmalıdı')
    .test(
      'maxValue',
      'Maxsimum dəyər 700 olmalıdı',
      (value) => value === null || parseInt(value) <= 700 
    ),
  masterScore: Yup.string()
    .required('Xana boş buraxılmamalıdı')
    .max(3, 'Maxsimum dəyər 100 olmalıdı')
    .test(
      'maxValue',
      'Maxsimum dəyər 100 olmalıdı',
      (value) => value === null || parseInt(value) <= 100  
    ),
  phdScore: Yup.string()
    .required('Xana boş buraxılmamalıdı') 
    .max(1, 'Maxsimum dəyər 8 olmalıdı')
    .test(
      'maxValue',
      'Maxsimum dəyər 8 olmalıdı',
      (value) => value === null || parseInt(value) <= 8 
    ),
})
export type EducationQuestionsFormValues = Yup.InferType<typeof validationSchema>;

import {
  GeneralQuestionsFormProps,
  GeneralQuestionsFormValues
} from './GeneralQuestionsForm' 

const EducationQuestionsForm = ({
  subStageSlug,
  stageIndex
}: GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery()

  const nav = useNavigate()

  const { state } = useLocation()

  const {
    slug: slugName,
    stage_name: stageName,
    stage_children
  } = stagesData?.[stageIndex] || {}

  const { slug: subSlugName, stage_name: subStageName } =
    stage_children?.[stageIndex + 2] || {}

  const { slug: prevSubSlugName, stage_name: prevSubStageName } =
    stage_children?.[stageIndex] || {}

  const dispatch = useAppDispatch()
  const { education } =
    (useAppSelector(state => state.stageForm)?.find(
      ({ name }) => name === prevSubSlugName
    )?.formData as GeneralQuestionsFormValues) || {}

  const { formData } =
    (useAppSelector(state => state.stageForm)?.find(
      ({ name }) => name === subStageSlug
    ) as { formData: EducationQuestionsFormValues }) || {}

  const {
    data: questionsData,
    error: questionsError,
    isLoading
  } = useGetDependQuestionsQuery({
    subSlugName: subStageSlug,
    dependQuestionId: education?.id
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<EducationQuestionsFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      vocationalScore: '',
      bachelorsScore: '',
      masterScore: '',
      phdScore: ''
    }
  })

  const onSubmit: SubmitHandler<EducationQuestionsFormValues> = data =>
    console.log(data)

  const questions = questionsData?.[0]?.questions

  useEffect(() => {
    const subscription = watch(value => {
      console.log(value);
      dispatch(
        updateStageForm({
          name: subStageSlug,
          formData: value as EducationQuestionsFormValues
        })
      )
    })

    reset(formData)

    if (
      education?.id === 0 ||
      questions?.length === 0 ||
      education?.answer === 'Orta təhsil'
    ) {
      console.log(state)
      state.subStageName === 'Olimpiada sualları'
        ? nav(`/stages/${slugName}/${prevSubSlugName}`, {
            state: { subStageName: prevSubStageName, stageName: stageName }
          })
        : nav(`/stages/${slugName}/${subSlugName}`, {
            state: { subStageName: subStageName, stageName: stageName }
          })
    }

    return () => {
      subscription.unsubscribe()
    }
  }, [subStageSlug, watch])

  if (isLoading) return <div>Loading...</div>
  if (questionsError) return <div>Error</div>

  const inputProps = [
    {
      register: register('vocationalScore',{ maxLength: 2 }),
      placeholder: '0-50',
      error: errors?.vocationalScore?.message
    },
    {
      register: register('bachelorsScore',{ maxLength: 2 }),
      placeholder: '0-700',
      error: errors?.bachelorsScore?.message
    },
    {
      register: register('masterScore',{ maxLength: 2 }),
      placeholder: '0-100',
      error: errors?.masterScore?.message
    },
    {
      register: register('phdScore',{ maxLength: 2 }),
      placeholder: '0-8',
      error: errors?.phdScore?.message
    }
  ]

  console.log(questions)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-7 flex-col flex gap-5'
    >
      <div className='space-y-7'>
        {questions?.map(({ question_title, id }) => (
          <>
            {' '}
            <TextInput
              type='number'
              key={id}
              label={`${question_title}*`}
              placeholder={
                inputProps[
                  id === 6 ? 0 : id >= 10 ? id - 9 : id > 7 ? id - 7 : 1
                ].placeholder
              } 
              register={
                inputProps[
                  id === 6 ? 0 : id >= 10 ? id - 9 : id >= 7 ? id - 7 : 1
                ].register
              }
              errorMessage={inputProps[
                id === 6 ? 0 : id >= 10 ? id - 9 : id >= 7 ? id - 7 : 2
              ]?.error
              }
              className={
                inputProps[
                  id === 6 ? 0 : id >= 10 ? id - 9 : id >= 7 ? id - 7 : 2
                ]?.error 
                 && " outline outline-1 outline-red-400"}
            />
 
          </>
        ))}
      </div>
    

      <LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName: prevSubSlugName }
        }}
        typeOf='outline'
        label='Geri'
        className='absolute left-0 -bottom-20'
      />

      <LinkButton
        nav={{
          state: { stageName, subStageName },
          path: { slugName, subSlugName }
        }}
        label='Növbəti'
        className='absolute right-0 -bottom-20'
      />
    </form>
  )
}

export default EducationQuestionsForm
