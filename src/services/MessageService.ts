import {
  IChatMessage,
  IChatMessageJoin,
  IChatMessageLeave,
  IChatMessageSend,
  ChatMessageType,
} from "../model/Message";

/**
 * This mocks a websocket connection to a server
 * All state in this class represents mocked server side state
 *
 */
export class MessageService {
  private interval: number | null = null;
  private onMessage: ((message: IChatMessage) => void) | null = null;
  private usersInChat: string[] = [];
  private currentUser: string | null = null;
  private mockUserId: number = 1;

  public subscribe(
    chatId: string,
    username: string,
    onMessage: (message: IChatMessage) => void
  ): void {
    console.log("Mock subscribed to chat", chatId);
    this.currentUser = username;
    this.onMessage = onMessage;
    this.interval = setInterval(this.tick.bind(this), 1000);
    this.join(username);
  }

  public unsubscribe(chatId: string, username: string): void {
    console.log("Mock unsubscribed from chat", chatId, username);
    this.leave(username);
    if (this.interval) clearInterval(this.interval);
  }

  public sendMessage(message: string, username: string): void {
    if (!this.onMessage) {
      throw new Error("Dude, you gotta sub first");
    }

    const chatMessage: IChatMessageSend = {
      type: ChatMessageType.SEND,
      username,
      timestamp: Date.now(),
      message,
    };

    this.onMessage(chatMessage);
  }

  public join(username: string): void {
    if (!this.onMessage) {
      throw new Error("Dude, you gotta sub first");
    }

    if (this.usersInChat.includes(username)) {
      throw new Error(`User "${username}" is already in chat`);
    }

    this.usersInChat.push(username);

    const chatMessage: IChatMessageJoin = {
      type: ChatMessageType.JOIN,
      username: username,
      timestamp: Date.now(),
    };

    this.onMessage(chatMessage);
  }

  public leave(username: string): void {
    if (!this.onMessage) {
      throw new Error("Dude, you gotta sub first");
    }

    if (!this.usersInChat.includes(username)) {
      throw new Error("User is not in chat");
    }

    this.usersInChat = this.usersInChat.filter((u) => u !== username);

    const chatMessage: IChatMessageLeave = {
      type: ChatMessageType.LEAVE,
      username: username,
      timestamp: Date.now(),
    };

    this.onMessage(chatMessage);
  }

  private tick(): void {
    const random = Math.random();

    if (
      (random < 0.1 || this.usersInChat.length < 2) &&
      this.usersInChat.length < 10
    ) {
      const user = `MockUser-${this.mockUserId}`;
      this.mockUserId++;

      this.join(user);
    } else if (random > 0.9) {
      const user =
        this.usersInChat[Math.floor(Math.random() * this.usersInChat.length)];
      if (user === this.currentUser) return;

      this.leave(user);
    } else if (random > 0.4 && random < 0.8) {
      const user =
        this.usersInChat[Math.floor(Math.random() * this.usersInChat.length)];
      if (user === this.currentUser) return;

      this.sendMessage("Lorem ipsum", user);
    }
  }
}
