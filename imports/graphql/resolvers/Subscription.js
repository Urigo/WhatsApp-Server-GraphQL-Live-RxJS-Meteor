import { Chats } from '/imports/collections/Chats';
import { Messages } from '/imports/collections/Messages';

export default {
  Message: {
    subscribe: Messages.subscribtion(),
  },
  Chat: {
    subscribe: Chats.subscribtion(),
  },
};
