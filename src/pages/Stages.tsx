import { Fragment } from "react";

import { ReactComponent as Pattern } from "../assets/pattern.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as StageEdu } from "../assets/stage-frame.svg";
import { ReactComponent as StageLang } from "../assets/Teacher.svg";
import { ReactComponent as StageSkills } from "../assets/skills.svg";
import { ReactComponent as StageSport } from "../assets/sport.svg";
import { ReactComponent as StageProg } from "../assets/programmer.svg";
import { ReactComponent as StageExperience} from "../assets/programmerBoy.svg";

import Stage from "../components/Stage";
import { Link, useParams } from "react-router-dom";

const Stages = () => {
  const { stageSlug } = useParams();

  const getFrame = () => {
    switch (stageSlug) {
      case "tehsil":
        return (
          <StageEdu className="absolute w-80 h-80 left-[220px] top-[462px]" />
        );

      case "dil-bilikleri":
        return (
          <StageLang className="absolute w-80 h-80  left-[220px] top-[462px]" />
        );

      case "xususi-bacariqlar":
        return (
          <StageSkills className="absolute w-80 h-80  left-[180px] top-[480px]" />
        );

      case "idman":
        return (
          <StageSport className="absolute w-80 h-72 left-[220px] top-[522px]" />
        );
      case "is-tecrubesi":
        return (
          <StageExperience className="absolute w-80 h-72 left-[220px] top-[460px]" />
        );
      case "proqram-bilikleri":
        return (
          <StageProg className="absolute w-80 h-80  left-[220px] top-[462px]" />
        );

      default:
        return (
          <StageEdu className="absolute w-80 h-80  left-[220px] top-[462px]" />
        );
    }
  };
  return (
    <Fragment>
      <Pattern className="absolute left-0 top-0" />
      <div className="w-[3px] h-[314px] bg-white absolute left-4"></div>
      <div className="w-[2px] h-[407px] bg-white absolute left-[25.5px]"></div>
      <div className="flex justify-between relative pl-10 pt-10">
        <div className="space-y-8 text-white">
          <div className="space-y-2">
            <Link to="/">
              <Logo className="w-52 h-7" />
            </Link>
            <p>Süni intelekt sistemi</p>
          </div>

          <p className="max-w-[234px]">
            Bu formu doldurduqdan sonra öz yaşıdlarınız arasında ən yaxşı hansı
            faizlikdə olduğunuzu müəyyən edə biləcəksiniz.
          </p>
        </div>
        <Stage />
      </div>
      <div>{getFrame()}</div>
    </Fragment>
  );
};

export default Stages;
