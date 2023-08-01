import { Fragment, useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useGetStageQuery } from "../services/stage";
import ProgressBar from "./ProgressBar";
import GeneralQuestionsForm from "./Stages/Education/GeneralQuestionsForm";
import EducationQuestionsForm from "./Stages/Education/EducationQuestionsForm";
import useGetSubStageName from "../hooks/useGetSubStageName";
import OlympiadQuestionsForm from "./Stages/Education/OlympiadQuestionsForm";
import LanguangeQuestionsForm from "./Stages/Languange/LanguageQuestionsForm";
import SpecialSkillsForm from "./Stages/SpecialSkills/SpecialSkillsQuestionsForm";
import SportForm from "./Stages/Sport/SportQuestionsForm";
import SportForm2 from "./Stages/Sport/ProLevelList";
import ProgramSkills from "./Stages/ProgramSkills/ProgramSkillsQuestionsForm";
import JobExperienceForm from "./Stages/JobExperience/JobExperienceForm";
import SpecialSkillsCertifcateQuestionsForm from "./Stages/SpecialSkills/SpecialSkillsCertifcateQuestionsForm";

const Stage = () => {
  const { data, error, isLoading } = useGetStageQuery();

  const { stageName } = (useLocation().state as {
    stageName: string;
  }) || { subStageName: "", stageName: "" };
  const { subStageSlug, stageSlug } = useParams();
  const [progress, setProgress] = useState(0);

  const stageIndex = useMemo(
    () => data?.findIndex(({ stage_name }) => stageName === stage_name),
    [data, stageName]
  );

  const subStageIndex = useMemo(
    () =>
      data?.[stageIndex || 0]?.stage_children?.findIndex(
        ({ slug }) => subStageSlug === slug
      ) ?? 0,
    [data, stageIndex, subStageSlug]
  );
  const percentage = useMemo(
    () => data?.[stageIndex || 0]?.child_count ?? 0,
    [data, stageIndex]
  );

  const subStageName = useGetSubStageName({
    slugName: stageSlug,
    subSlugName: subStageSlug,
    data: data,
  });

  const handleProgressChange = useCallback(
    (newProgress: number) => {
      setProgress(newProgress);
    },
    [setProgress]
  );

  const getSubStageForm = () => {
    switch (subStageSlug) {
      case "umumi-suallar":
        return (
          <GeneralQuestionsForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      case "orta-texniki-ve-ali-tehsil-suallari":
        return (
          <EducationQuestionsForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );

      case "olimpiada-suallar":
        return (
          <OlympiadQuestionsForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );

      case "dil-bilikleri-substage":
        return (
          <LanguangeQuestionsForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      case "xususi-bacariqlar-substage":
        return (
          <SpecialSkillsForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      case "xususi-bacariqlar-sertifikat-substage":
        return (
          <SpecialSkillsCertifcateQuestionsForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      case "idman-substage":
        return (
          <SportForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      case "idman-substage2":
        return (
          <SportForm2
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      case "is-tecrubesi-substage":
        return (
          <JobExperienceForm
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
      case "proqram-bilikleri-substage":
        return (
          <ProgramSkills
            stageIndex={stageIndex}
            subStageSlug={subStageSlug || ""}
          />
        );
    }
  };

  useEffect(() => {
    handleProgressChange(
      parseInt((((subStageIndex + 1) * 100) / percentage).toFixed()) || 0
    );
  }, [subStageIndex, subStageSlug, data, stageIndex]);

  if (isLoading)
    return (
      <div className="flex items-center w-full justify-center">Loading...</div>
    );
  if (error || stageName === "")
    return <div className="flex items-center w-full justify-center">Error</div>;

  return (
    <Fragment>
      <div className="flex-1 flex justify-end pr-32 mt-10 min-w-[1130px] max-w-[1175px] relative">
        <div className="w-full z-10 relative rounded-xl bg-white py-8 px-11 h-[611px] shadow max-w-xl">
          <h1 className="mb-4">
            <span className=" text-qss-secondary">
              {subStageName === "Dil Bilikləri substage"
                ? "Dil Bilikləri"
                : subStageName === "Xüsusi bacarıqlar substage"
                ? "Xüsusi bacarıqlar"
                : subStageName === "Idman substage"
                ? "İdman"
                : subStageName === "İş təcrübəsi substage"
                ? "İş təcrübəsi"
                : subStageName}
            </span>
          </h1>
          <ProgressBar progress={progress} subStageIndex={subStageIndex} />

          {getSubStageForm()}
        </div>

        <div className="absolute max-w-xs w-full left-72 space-y-4 top-1">
          {data?.map(({ stage_name }, id) => (
            <div
              key={id}
              className={`${
                stageName?.toLowerCase().includes(stage_name.toLowerCase()) &&
                "!pl-20 active"
              } whitespace-nowrap stage-box transition-all duration-500`}
            >
              {id === stageIndex && (
                <h2 className="absolute left-4">{id + 1}.</h2>
              )}
              <h2>{stage_name}</h2>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Stage;
