import { Chats } from '/imports/collections/Chats';
import { Messages } from '/imports/collections/Messages';
import { Members } from '/imports/collections/Members';

export default {
  allChats: (r, args) => Chats.all(args),
  allMessages: (r, args) => Messages.all(args),
  allMembers: (r, args) => Members.all(args),
  Chat: (r, args) => Chats.single(args),
};
