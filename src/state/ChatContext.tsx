import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { ChatMessageType, IChatMessage } from "../model/Message";
import { MessageService } from "../services/MessageService";
import { IUser } from "../model/User";
import { useRerender } from "../utils/useRerender";

interface IChatContext {
  messages: IChatMessage[];
  users: IUser[];
  sendMessage: (message: string) => void;
}

export const ChatContext = React.createContext<IChatContext | undefined>(
  undefined
);

export const ChatContextProvider: React.FC<{
  username: string;
  chatId: string;
  children?: ReactNode;
}> = ({ username, chatId, children }) => {
  const messageService = useMemo(() => new MessageService(), []);
  const users = useRef<IUser[]>([]);
  const messages = useRef<IChatMessage[]>([]);
  const rerender = useRerender();

  const sendMessage = useCallback(
    (message: string) => {
      messageService.sendMessage(message, username);
    },
    [messageService, username]
  );

  const onMessage = useCallback(
    (message: IChatMessage) => {
      switch (message.type) {
        case ChatMessageType.JOIN:
          users.current = [
            ...users.current,
            { username: message.username, lastActivity: message.timestamp },
          ];
          break;
        case ChatMessageType.LEAVE:
          users.current = users.current.filter(
            (u) => u.username !== message.username
          );
          break;
        case ChatMessageType.SEND:
        default:
          break;
      }

      messages.current = [...messages.current, message];

      rerender();
    },
    [rerender]
  );

  useEffect(() => {
    messageService.subscribe(chatId, username, onMessage);
    return () => {
      messageService.unsubscribe(chatId, username);
      messages.current = [];
      users.current = [];
    };
  }, [chatId, messageService, onMessage, username]);

  return (
    <ChatContext.Provider
      value={{
        sendMessage,
        messages: messages.current,
        users: users.current,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error(
      "Do not use ChatContext outside of a chat, you silly person"
    );
  }

  return context;
};

export const useMessages = () => {
  const { messages } = useChatContext();

  return messages;
};

export const useSendMessage = () => {
  const { sendMessage } = useChatContext();

  return sendMessage;
};

export const useChatUsers = () => {
  const { users } = useChatContext();

  return users;
};
