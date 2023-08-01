import { ReactComponent as ChatBotLogo } from "../../../assets/chatbot.svg";

interface IChatContent {
  name: string;
}

const date = new Date();
const time = date.toLocaleTimeString();

const ChatContent = ({ name }: IChatContent) => (
  <div className="flex items-center flex-col gap-1.5">
    <ChatBotLogo className="w-20 h-20" />
    <h3 className="font-medium">{name}</h3>
    <p className="text-xs break-words text-gray-400">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </p>
    <span className="text-xs font-medium text-gray-400">{time}</span>
  </div>
);

export default ChatContent;
