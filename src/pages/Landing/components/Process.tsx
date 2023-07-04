import { ReactComponent as RegistrationIcon } from "assets/registration.svg";
import { ReactComponent as TestingIcon } from "assets/testing.svg";
import { ReactComponent as ReportIcon } from "assets/report.svg";
import { ReactComponent as ChatBotIcon } from "assets/chatbot.svg";
import { Link } from "react-router-dom";
import { useGetStageQuery } from "services/stage";

const Process = () => {
  const { data } = useGetStageQuery();
  const {
    slug: slugName,
    stage_name: stageName,
    stage_children,
  } = data?.[0] || {};
  const { slug: subSlugName, stage_name: subStageName } =
    stage_children?.[0] || {};

  const process = [
    {
      id: 1,
      title: "Registration",
      icon: <RegistrationIcon />,
      content: "Complete registration filing your personal info",
    },
    {
      id: 2,
      title: "Testing",
      icon: <TestingIcon />,
      content: "The test consist of 6 stages",
    },
    {
      id: 3,
      title: "Report",
      icon: <ReportIcon />,
      content: "Get your report verified by our system",
    },
    {
      id: 4,
      title: "ChatBot",
      icon: <ChatBotIcon />,
      content:
        "Based on your testing result get special insights for you career ",
    },
  ];

  return (
    <div className="pb-20">
      <h3 className="font-medium text-xl text-center mb-5 text-opacity-80">
        Talent score
      </h3>
      <p className="text-xl text-center mb-8  text-opacity-80">
        4 easy steps to get successful in your career using our certification
        system
      </p>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {process.map(({ id, title, icon, content }) => (
          <li
            key={id}
            className="flex flex-col items-center box-shadow px-1 py-5 rounded-2xl justify-start bg-gradient-to-b from-[#DBEAF8] to-[#E6EEF4] gap-5"
          >
            <h4 className="text-xl font-medium text-qss-primary ">{title}</h4>
            <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center overflow-hidden">
              {icon}
            </div>
            <p className="text-center text-qss-inputText text-opacity-80">
              {content}
            </p>
          </li>
        ))}
      </ul>

      <Link
        to={`/stages/${slugName}/${subSlugName}`}
        state={{
          subStageName: subStageName,
          stageName: stageName,
        }}
        className="flex w-fit mx-auto mt-8"
      >
        <button className="flex justify-center items-center py-3 px-8 text-white rounded-full bg-qss-primary">
          Get started
        </button>
      </Link>
    </div>
  );
};

export default Process;
