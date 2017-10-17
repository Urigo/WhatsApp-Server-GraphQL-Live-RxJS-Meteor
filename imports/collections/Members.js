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
      author: this._id,
    }).fetch();
  },
  getChats({filter, first}) {
    const selector = chatFilter({
      members: this._id
    }, filter);
    const options = {};

    if (first) {
      options.limit = first;
    }

    return Chats.find(selector, options).fetch();
  },
});

Members.all = ({filter, first}) => {
  const selector = memberFilter({}, filter);
  const options = {};

  if (first) {
    options.limit = first;
  }

  return Members.find(selector, options).fetch();
};

Members.attachSchema(MembersSchema);
