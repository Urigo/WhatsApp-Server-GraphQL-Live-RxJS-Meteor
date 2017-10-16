import SimpleSchema from 'simpl-schema';

import { Collection, requiredAfterSet } from '/imports/collections/Collection';
import { Chats } from '/imports/collections/Chats';
import { Members } from '/imports/collections/Members';
import { messageFilter } from '/imports/filters/message';

export const Messages = new Collection('messages');

export const MessagesSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    custom: requiredAfterSet,
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  chat: {
    type: String,
    optional: true
  },
});

Messages.helpers({
  getChat() {
    return Chats.findOne({
      _id: this.chat
    });
  },
  getAuthor() {
    return Members.findOne({
      _id: this.author
    });
  }
});

Messages.all = ({filter}) => {
  const query = messageFilter(filter);

  return Messages.find(query).fetch();
};

Messages.attachSchema(MessagesSchema);