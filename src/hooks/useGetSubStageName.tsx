import { useEffect, useState } from "react";
import { IStage } from "../types";

type UseGetSubStageNameType = {
  subSlugName?: string;
  slugName?: string;
  data: IStage[] | undefined;
};

const useGetSubStageName = ({
  subSlugName,
  slugName,
  data,
}: UseGetSubStageNameType) => {
  const getSubStageName = (subSlugName?: string, slugName?: string) =>
    data
      ?.find(({ slug }) => slug === slugName)
      ?.stage_children?.find(({ slug }) => slug === subSlugName)?.stage_name ||
    "";

  const [name, setName] = useState(getSubStageName(subSlugName, slugName));

  useEffect(() => {
    setName(getSubStageName(subSlugName, slugName));
  }, [subSlugName, slugName, data]);

  return name;
};

export default useGetSubStageName;
