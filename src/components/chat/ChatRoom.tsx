import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useChatUsers, useMessages } from "../../state/ChatContext";
import { ChatMessage } from "./ChatMessage";
import { BoldText, Text } from "../typography";
import { ButtonLink } from "../ChatButton";
import { IUser } from "../../model/User";
import dayjs from "dayjs";
import { ChatMessageInput } from "./ChatMessageInput";

export const ChatRoom: React.FC = () => {
  const messages = useMessages();
  const users = useChatUsers();
  const ref = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  return (
    <Container>
      <ChatRoomContainer>
        <MessageContainer ref={ref}>
          {messages.map((m) => (
            <ChatMessage
              key={`${m.timestamp}-${m.username}-${m.type}`}
              message={m}
            />
          ))}
        </MessageContainer>
        <ChatMessageInput />
      </ChatRoomContainer>
      <UserContainer>
        {selectedUser ? (
          <>
            <NameContainer>
              <BoldText as="div" onClick={() => setSelectedUser(null)}>
                {selectedUser.username}
              </BoldText>
              <ButtonLink onClick={() => setSelectedUser(null)}>X</ButtonLink>
            </NameContainer>
            <Text>
              Last active: {dayjs(selectedUser.lastActivity).format("HH:mm")}
            </Text>
          </>
        ) : (
          <>
            <BoldText as="div">Users in chat</BoldText>
            {users.map((user) => (
              <ButtonLink
                as="div"
                onClick={() => setSelectedUser(user)}
                key={user.username}
              >
                {user.username}
              </ButtonLink>
            ))}
          </>
        )}
      </UserContainer>
    </Container>
  );
};

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: calc(100% - 300px);
  overflow: hidden;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: calc(100% + 20px);
`;

const UserContainer = styled.div`
  height: 100%;
  width: 300px;
  padding: 0 1rem;
`;
