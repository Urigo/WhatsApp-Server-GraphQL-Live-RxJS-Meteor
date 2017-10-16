import { Chats } from '/imports/collections/Chats';
import { Messages } from '/imports/collections/Messages';

export default {
  createChat: (r,args) => Chats.create(args),
  deleteChat: (r, args) => Chats.delete(args),
  createMessage: (r, args) => Messages.create(args),
};
