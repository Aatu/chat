import React, { useCallback, useState } from "react";
import { Heading } from "../typography";
import { ChatInput } from "../ChatInput";
import styled from "styled-components";
import { ChatButton } from "../ChatButton";
import { ChatContextProvider } from "../../state/ChatContext";
import { ChatRoom } from "./ChatRoom";

export const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [inChat, setInChat] = useState<boolean>(false);

  const enterChat = useCallback(() => {
    if (username.trim().length < 3) {
      return;
    }

    setInChat(true);
  }, [username]);

  if (inChat && username) {
    return (
      <ChatContextProvider username={username} chatId="test-chat">
        <ChatRoom />
      </ChatContextProvider>
    );
  } else {
    return (
      <ChatLobby
        username={username}
        setUsername={setUsername}
        enterChat={enterChat}
      />
    );
  }
};

const ChatLobby: React.FC<{
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  enterChat: () => void;
}> = ({ username, setUsername, enterChat }) => {
  return (
    <LobbyContainer>
      <Heading>Enter username:</Heading>
      <ChatInput
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
        type="text"
        autoComplete="off"
      />
      <ChatButton onClick={() => enterChat()}>Enter chat</ChatButton>
    </LobbyContainer>
  );
};

const LobbyContainer = styled.div`
  width: 25%;
  min-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
