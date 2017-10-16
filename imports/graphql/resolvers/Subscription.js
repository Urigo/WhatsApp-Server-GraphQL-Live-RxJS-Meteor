import { Chats } from '/imports/collections/Chats';
import { Messages } from '/imports/collections/Messages';

export default {
  Message: (r, args) => Messages.subscribtion(args),
  Chat: (r, args) => Chats.subscription(args),
};
