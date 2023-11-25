import React, { useCallback, useState } from "react";
import { ChatInput } from "../ChatInput";
import { useSendMessage } from "../../state/ChatContext";

export const ChatMessageInput: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const sendMessage = useSendMessage();

  const handleEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      sendMessage(currentMessage);
      setCurrentMessage("");
    },
    [sendMessage, currentMessage]
  );

  return (
    <ChatInput
      name="username"
      value={currentMessage}
      onChange={(e) => setCurrentMessage(e.target.value)}
      type="text"
      autoComplete="off"
      onKeyUp={handleEnter}
    />
  );
};
