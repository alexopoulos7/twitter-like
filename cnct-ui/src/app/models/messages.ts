import { User } from "./users";
import { MessageLike } from "./likes";


export class Message {
  parent: number;
  text: string;
  authors: Array<User>;
  likes: Array<MessageLike>;
  id: number;

  constructor() {

  }
}
