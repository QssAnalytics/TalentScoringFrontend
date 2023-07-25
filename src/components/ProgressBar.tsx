import { useGetStageQuery } from "../services/stage";
import { GeneralQuestionsFormProps } from "./Stages/Education/GeneralQuestionsForm";

type ProgressBarType = {
  progress: number;
  subStageIndex:number;
};



const ProgressBar = ({ progress = 0,subStageIndex }: ProgressBarType,{stageIndex}:GeneralQuestionsFormProps) => {
  const { data: stagesData } = useGetStageQuery();

  const { stage_children } = stagesData?.[stageIndex] || {};
  return (
    <div className="relative h-[22px] w-full rounded-lg bg-qss-input">
      <div
        className="absolute h-full rounded-lg transition-all duration-500 bg-qss-input flex justify-end items-center"
        style={{ width: `${progress}%` }}
      >
        {stage_children?.map((child)=>child.id)}
        <div className="circle p-3 w-12 rounded-full absolute bg-qss-secondary text-white flex justify-center">
          <span>
            {subStageIndex+1}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
