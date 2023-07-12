import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

interface ILinkButton {
  label: string;
  type?: any;
  typeOf?: btnType;
  nav: navType ;
  className: string;
  haveIcon?: boolean; 
  onClick?: any;
  disabled?:boolean;
}

type btnType = "outline";

type navType = {

  path: { slugName?: string; subSlugName?: string };
  state: { subStageName?: string; stageName?: string };
};

const LinkButton = ({
  label,
  type,
  nav,
  className, 
  onClick,
  typeOf,
  haveIcon = true,disabled=false
}: ILinkButton) => {
  return (
  <button  
      onClick={onClick}
      type={type}
      className={`w-[180px] flex rounded-full justify-center items-center py-3.5 gap-4 ${
        typeOf === "outline"
          ? "flex-row-reverse border border-qss-secondary text-qss-secondary bg-transparent"
          : "bg-qss-secondary flex-row text-white"
      } ${className}`}

       
      > 
      {!disabled ?

        <Link
        to={`/stages/${nav.path.slugName}/${nav.path.subSlugName}`}
        state={{
          subStageName: nav.state.subStageName,
          stageName: nav.state.stageName,
      }}
   
    >
     
        {label}
        {haveIcon && (
          <Icon
          icon="material-symbols:arrow-right-alt-rounded"
          className={typeOf === "outline" ? "rotate-180" : "rotate-0"}
          width="1.5rem"
          />
          )}
    </Link>
      : <div>

        {label}
      </div>
          } 
      </button>
  );
};

export default LinkButton;
