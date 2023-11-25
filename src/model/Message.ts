export enum ChatMessageType {
  JOIN,
  LEAVE,
  SEND,
}

export interface IChatMessage {
  type: ChatMessageType;
  timestamp: number;
  username: string;
}

export interface IChatMessageSend extends IChatMessage {
  type: ChatMessageType.SEND;
  message: string;
}

export interface IChatMessageJoin extends IChatMessage {
  type: ChatMessageType.JOIN;
}

export interface IChatMessageLeave extends IChatMessage {
  type: ChatMessageType.LEAVE;
}
