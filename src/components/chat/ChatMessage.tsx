import React from "react";
import {
  ChatMessageType,
  IChatMessage,
  IChatMessageSend,
} from "../../model/Message";
import { BoldText, Text } from "../typography";
import dayjs from "dayjs";

export const ChatMessage: React.FC<{ message: IChatMessage }> = ({
  message,
}) => {
  switch (message.type) {
    case ChatMessageType.JOIN:
      return (
        <BoldText as="div">
          {dayjs(message.timestamp).format("HH:mm")}
          {` ${message.username} joined the chat`}
        </BoldText>
      );
    case ChatMessageType.LEAVE:
      return (
        <BoldText as="div">
          {dayjs(message.timestamp).format("HH:mm")}
          {` ${message.username} left the chat`}
        </BoldText>
      );
    case ChatMessageType.SEND:
      return (
        <div>
          <BoldText as="div">
            {dayjs(message.timestamp).format("HH:mm")}
            {` ${message.username}:`}
          </BoldText>
          <Text>{(message as IChatMessageSend).message}</Text>
        </div>
      );
  }
};