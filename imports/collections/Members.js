import SimpleSchema from 'simpl-schema';

import { Collection } from '/imports/collections/Collection';
import { Messages } from '/imports/collections/Messages';
import { Chats } from '/imports/collections/Chats';
import { chatFilter } from '/imports/filters/chat';
import { memberFilter } from '/imports/filters/member';

export const Members = new Collection('members');

export const MembersSchema = new SimpleSchema({
  createdAt: {
    type: Date,
  },
  name: {
    type: String
  },
  title: {
    type: String,
    optional: true
  },
});

Members.helpers({
  getMessages() {
    return Messages.find({
      members: this._id,
    }).fetch();
  },
  getChats({filter, first}) {
    const query = chatFilter(filter);
    const modifiers = {};

    if (first) {
      modifiers.max = first;
    }

    return Chats.find(query, modifiers).fetch();
  },
});

Members.all = ({filter, first}) => {
  const query = memberFilter(filter);
  const modifiers = {};

  if (first) {
    modifiers.max = first;
  }

  return Members.find(query, modifiers).fetch();
};

Members.attachSchema(MembersSchema);
