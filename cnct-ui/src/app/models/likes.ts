import { User } from "./users";
import { Message } from "./messages";

export class MessageLike {
    id: Number;
    message: Number | Message;
    user: Number | User;
}