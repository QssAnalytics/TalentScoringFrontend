import { ReactComponent as ChatBotLogo } from "../../../assets/chatbot-transparent.svg";
import { Icon } from "@iconify/react";

interface IChatHeaderProps {
  name: string;
  closeChat: () => void;
}

const ChatHeader = ({ name, closeChat }: IChatHeaderProps) => (
  <div className="flex items-center justify-between pb-1">
    <div className="flex items-center">
      <ChatBotLogo className="w-12 h-12" />
      <div className="flex flex-col mt-2">
        <h2 className="text-sm font-medium">{name}</h2>
        <span className="text-xs text-gray-400">Active</span>
      </div>
    </div>
    <Icon
      icon="mi:close"
      className="text-xl text-qss-secondary mt-2 cursor-pointer"
      onClick={closeChat}
    />
  </div>
);

export default ChatHeader;
