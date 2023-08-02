
import  { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import { useSelector } from 'react-redux';

import Radio from "../../../RadioInput";
import Select from "../../../Select";
import TextInput from "../../../TextInput";

import DateInput from "components/DateInput";
import SelectMult from "components/SelectMult";
import { Zoom } from "react-awesome-reveal";
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addData, addElave, addTehsilPage } from "state/dataSlice";
import { EducationQuestionsFormValues } from '../EducationQuestionsForm';
import { IQuestionQuestion } from "types";
interface RootState {
  dataa: {
    tehsil:string,
    elave:boolean
  };
}

const schema = yup
  .object({
    id: yup.string().required(),
    tehsil:yup.object({ answer: yup.string().required(), weight: yup.string().required() }),
    country: yup.string(),
    university: yup.string(),
    specialty: yup.object({ answer: yup.string().required(), weight: yup.string().required() }),
    date: yup.object({ start: yup.string(), end: yup.string() }),
    criteria: yup.string(),
    local: yup.object({
      examName: yup.string(),
      score: yup.string(),
      maxScore: yup.string(),
    }),
    Att: yup.string(),
    SAT:yup.string(),
    otherExam:yup.object({name:yup.string(),    
      score: yup.string(),
      maxScore: yup.string(),}).optional(),
  ielts:yup.string(),
  toefl:yup.string(),
  
    application: yup.array()
  })
  .required();

export type AddEduFormValues = yup.InferType<typeof schema>;
type EducationAdd = {
  name:string,
  questions:IQuestionQuestion[] |undefined,
  formData:EducationQuestionsFormValues,
  handleAddEdu: () => void
};
const FormEducations = ({questions,formData,handleAddEdu,name}:EducationAdd) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddEduFormValues>({
    defaultValues:{
      id:"",
      tehsil:"",
      country: "",
      university:"",
      specialty: {answer:"", weight:""},
      date:{start:"",end:""},
      criteria: "",
      local: {examName:"",score:"",maxScore:""},
      Att: "",
      SAT:"",
      otherExam:{name:"",score:"",maxScore:""},
    ielts:"",
    toefl:"",
    
      application: []


    }
  });
  
  const [other,setOther] = useState(false)
  const dispatch: Dispatch = useDispatch();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  const tehsil= useSelector((state: RootState) => state.dataa.tehsil);
  const elave= useSelector((state: RootState) => state.dataa.elave);
  const [ count,setCount] = useState(0)
  const copy = {
    id:formData.education.length+1,
    country: watch().country,
    university: watch().university,
    specialty: watch().specialty,
    date: watch().date,
    criteria: {
      criterion_type:watch().criteria,
      lokal_test:watch().local,
      application:[
        {
          application_type:"Atestat",
          score:watch().Att
        },
        {
          application_type:"language",
          language_type:[
            {
              language_name:"IELTS",
              language_score:watch().ielts
            },
            {
              
                language_name:"TOFEL",
                language_score:watch().toefl
              
            }
          ]
        },
        {
          application_type:"SAT",
          score:watch().SAT
        },
        {
          other_test:watch().otherExam
        }
       
      ]
    },
  }
  const handleDelete =useCallback((elem:any)=>{
    const copyy  = watch("application")?.indexOf(elem)
    if (copyy !==-1) {
      watch("application")?.splice(copyy,1)
    }

    setCount(count+1)
  },[count])
  const handleClick=()=>{
    if (tehsil!==name) {
      handleAddEdu(copy)
      dispatch(addTehsilPage(1))
      
    }else{
      handleAddEdu(copy)
      dispatch(addElave(true))
      dispatch(addData(1))
    }

  }
  console.log(watch().tehsil);
  
  return (
    <div className="h-[460px] overflow-y-scroll">
      {
        elave ===true && formData?.education.length!==0?<Select register={register("tehsil")} label={`${formData.education.length + 1}-ci Təhsilinizi qeyd edin`} options={[{
          id: 11,
          answer_title: "Bakalavr",
          stage_fit:"",
          answer_weight: null,
          answer_dependens_on: null
      },{
        id: 12,
        answer_title: "Magistratura",
        stage_fit:"",
        answer_weight: null,
        answer_dependens_on: null
    },{
      id: 13,
      answer_title: "PhD",
      stage_fit:"",
      answer_weight: null,
      answer_dependens_on: null
  }]}/>:null
      }
      <div className="mb-5 mt-3">
        <label><span style={{color:'#038477'}}>{elave===true? watch().tehsil?.answer:name}-</span>{ `${questions?.[0]?.question_title}`}</label>
        <TextInput
          placeholder="Ölkə"
          value={watch().country}
          register={register("country")}
          />
      </div>
      <div className="mb-5">
      <TextInput
          label={questions?.[1]?.question_title}
          placeholder="ADNSU"
          value={watch().university}
          register={register("university")}
        />
      </div>
      <div className="mb-5">
      <Select
          label={questions?.[2]?.question_title}
          options={questions?.[2]?.answers}
          value={watch().specialty}
          register={register("specialty")}
        />
      </div>


        <label>{questions?.[3]?.question_title}</label>
        <div className="flex  items-center gap-3 mb-3">
        <DateInput
        type="date"
        register={register("date.start")}/>
        <DateInput
        type="date"
        register={register("date.end")}
        />
        </div>
        <label className="mt-5">{questions?.[4]?.question_title}</label>
        <div className="flex items-center justify-between mt-3 mb-3">
            {
                questions?.[4]?.answers.map((elem,index)=>(
                    <Radio key={index} label={elem.answer_title} value={elem.answer_title}  register={register("criteria")}/>
                ))
            }
            
        </div>
        {
          watch().criteria === 'Lokal imtahan'?
            <Zoom>
                <label>
        {questions?.[5]?.question_title}
    
        </label>
        <div className="flex gap-5">
            <div className="w-4/4">
            <TextInput 
            placeholder="Imtahan"
            register={register("local.examName")}
        />
            </div>
               <TextInput 
            placeholder="bal"
            register={register("local.score")}
                 />
               <TextInput 
            placeholder="max bal"
            register={register("local.maxScore")}
        />
        </div>
            </Zoom>
          :null
        }
        {
          watch().criteria === 'Müraciyyət'?
            <div>
               <label>{questions?.[6]?.question_title}</label>
        <div className="flex">
            <div className="w-8/12">
            <SelectMult 
            options={questions?.[6]?.answers}
            label=""
            placeholder='Attestat - GPA'
            register={register("application")}
            />
            </div>
            <button className="ms-5  rounded-full "  onClick={()=> setOther(!other)}>Əlavə et +</button>
        </div>
        
            </div>
          :null
        }
       {
        watch().criteria ==='Hər ikisi'?
        <div>
            <label>
        {questions?.[5]?.question_title}
    
        </label>
        <div className="flex gap-5">
            <div className="w-4/4">
            <TextInput 
            placeholder="Imtahan"
            register={register("local.examName")}
        />
            </div>
               <TextInput 
            placeholder="bal"
            register={register("local.score")}
                 />
               <TextInput 
            placeholder="max bal"
            register={register("local.maxScore")}
        />
        </div>
        <label>{questions?.[6]?.question_title}</label>
        <div className="flex">
            <div className="w-8/12 ">
            <SelectMult 
            options={questions?.[6]?.answers}
            placeholder='Attestat - GPA'
            label=""
            register={register("application")}
            />
            </div>
            <button className="ms-5  rounded-full " onClick={()=> setOther(!other)}>Əlavə et +</button>
        </div>
        
        </div>
        
        :null
       }
       {
        watch().criteria ==='Hər ikisi' || watch().criteria === 'Müraciyyət'?
        <div>
          {
            watch("application")?.map((elem,index)=>(
              <div key={index} className={`${elem}`}>
                 <div className={` border rounded-xl p-5 mt-5 `}>
              <div className="flex justify-between  mb-3">
                <label><span style={{color:'#038477'}}>{elem}</span> üzrə, nəticəni qeyd edin</label>
                <Icon icon="flat-color-icons:cancel"  onClick={()=> handleDelete(elem)} />
              </div>
              {
                elem==='Language test (IELTS TOEFL)'?
                <div> <div className="mb-5">
                <TextInput  placeholder='İELTS Nəticə' register={register("ielts")}/>
            </div>
            <TextInput   placeholder='TOEFL Nəticə' register={register("toefl")}/></div>:     
            <TextInput   placeholder='Nəticə' register={register(elem.substr(0, 3))}/>
              }
         
              </div>
              </div>
             
            ))
          }
        </div>:null
       }
       {
        other? <div className="border rounded-xl p-5 mt-5">
        <div className="flex justify-between  mb-3">
            <label>Seçdiyiniz imtahanın adını,balınızı və max.bal qeyd edin</label>
            <Icon icon="flat-color-icons:cancel" onClick={()=> setOther(false)} />
        </div>
        <div className="flex gap-3">        
        <div className="w-3/4">
        <TextInput  placeholder='Testin adı' register={register("otherExam.name")}/>   </div>        
                     
                <TextInput  placeholder='Balınız' register={register("otherExam.score")}/>

        <TextInput  placeholder='Maksimal Bal' register={register("otherExam.maxScore")}/>
        </div>
</div>:null
       }
       <div className="w-full flex items-center justify-center mt-5">
         <button onClick={handleClick} className="border p-2 rounded-full px-5 items-center bg-qss-input flex">Yadda saxla <Icon icon="ic:round-done" className="text-xl" /></button>
       </div>
        
    </div>
  );
};

export default FormEducations;