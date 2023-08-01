import { ReactComponent as ChatBotLogo } from "../../../assets/chatbot.svg";

interface IChatAvatarProps {
  tooltip: string;
}

const ChatAvatar = ({ tooltip }: IChatAvatarProps) => {
  return (
    <div className="relative w-fit">
      <ChatBotLogo className="relative z-10 w-16 h-16 transition-all duration-500 cursor-pointer peer hover:-translate-y-1" />
      <span className="absolute tooltip">{tooltip}</span>
    </div>
  );
};

export default ChatAvatar;
