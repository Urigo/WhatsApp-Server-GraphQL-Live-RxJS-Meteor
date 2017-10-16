import SimpleSchema from 'simpl-schema';

import { Collection } from '/imports/collections/Collection';
import { Members } from '/imports/collections/Members';
import { Messages } from '/imports/collections/Messages';
import { memberFilter } from '/imports/filters/member';
import { chatFilter } from '/imports/filters/chat';

export const Chats = new Collection('chats');

export const ChatsSchema = new SimpleSchema({
  createdAt: {
    type: Date,
  },
  members: {
    type: Array
  },
  'members.$': {
    type: String
  },
});

Chats.helpers({
  getMembers({filter}) {
    const query = memberFilter(filter);
    
    return Members.find(query).fetch();
  },
  getMessages({last}) {
    if (last) {
      return Messages.find({}, { max: last }).sort({createdAt: -1}).fetch();
    }

    return Messages.find({}).fetch();
  }
});

Chats.all = ({filter}) => {
  const query = chatFilter(filter);

  return Chats.find(query).fetch();
};

Chats.single = ({filter}) => {
  const query = chatFilter(filter);
  
  return Chats.findOne(query);
};

Chats.attachSchema(ChatsSchema);
