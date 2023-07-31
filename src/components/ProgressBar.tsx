import { useGetStageQuery } from "../services/stage";
import { GeneralQuestionsFormProps } from "./Stages/Education/GeneralQuestionsForm";

type ProgressBarType = {
  progress: number;
  subStageIndex:number;
};




const ProgressBar = ({ progress = 0,subStageIndex }: ProgressBarType,{stageIndex}:GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();

  const { stage_children } = stagesData?.[stageIndex] || {};
  console.log(progress);
  return (
    <div className="relative h-[22px] w-full rounded-lg bg-qss-input">
      <div
        className="absolute h-full rounded-lg transition-all  bg-qss-secondary duration-500 bg-qss-input flex justify-end items-center"
        style={{ width: `${progress}%` }}
      >
        {stage_children?.map((child)=>child.id)}
        <div className={`circle p-3 w-12 rounded-full absolute  ${progress>=33? 'bg-qss-secondary':'bg-qss-input'}  ${progress>=33?'text-white':'text-black'}  flex justify-center`} style={{left:'-10px'}}>
          <span>
            1
          </span>
        </div>
        <div className={`circle p-3 w-12 rounded-full absolute ${progress>=67? 'bg-qss-secondary':'bg-qss-input'}  ${progress>=67?'text-white':'text-black'}  flex justify-center`} style={{left:'225px'}}>
          <span>
            2
          </span>
        </div>
        <div className={`circle p-3 w-12 rounded-full absolute ${progress>=100? 'bg-qss-secondary':'bg-qss-input'}  ${progress>=100?'text-white':'text-black'}    flex justify-center`} style={{left:'450px'}}>
          <span>
           3
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
