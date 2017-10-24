import SimpleSchema from 'simpl-schema';

import { withFilter } from 'graphql-subscriptions';

import { Collection } from '/imports/collections/Collection';
import { Members } from '/imports/collections/Members';
import { Messages } from '/imports/collections/Messages';
import { memberFilter } from '/imports/filters/member';
import { chatFilter } from '/imports/filters/chat';
import { subscriptionFilter } from '/imports/filters/subscriptions';
import { pubsub, topics } from '/imports/graphql/subscriptions';

import { MongoObservable } from 'meteor-rxjs';

export const Chats = new Collection('chats');
export const ChatsReactive = MongoObservable.fromExisting(Chats);

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
    let selector = memberFilter({}, filter);

    selector = {
      ...selector,
      _id: {
        ...selector._id,
        $in: this.members
      }
    };
    
    return Members.find(selector).fetch();
  },
  getMessages({last}) {
    const selector = {
      chat: this._id
    };
    const options = {};
    
    if (last) {
      options.limit = last;
      options.sort = {
        createdAt: -1
      };
    }

    return Messages.find(selector, options).fetch();
  }
});

Chats.create = ({membersIds}) => {
  const id = Chats.insert({
    members: membersIds
  });

  const record = Chats.findOne({_id: id});

  pubsub.publish(topics.CHAT, {
    Chat: {
      in_mutation: 'CREATED',
      node: record
    }
  });

  return record;
};

Chats.delete = ({id}) => {
  const chat = Chats.findOne({_id: id});

  Chats.remove({_id: id});

  pubsub.publish(topics.CHAT, {
    Chat: {
      in_mutation: 'DELETED',
      previousValues: chat
    }
  });

  return chat;
};

Chats.all = ({filter}) => {
  const selector = chatFilter({}, filter);

  return Chats.find(selector).fetch();
};

ChatsReactive.all = ({filter}) => {
    const selector = chatFilter({}, filter);

    return ChatsReactive.find(selector);
};

Chats.single = ({filter, id}) => {
  const selector = chatFilter({}, filter);
  
  if (id) {
    selector._id = id;
  }
  
  return Chats.findOne(selector);
};

ChatsReactive.single = ({filter, id}) => {
    const selector = chatFilter({}, filter);

    if (id) {
        selector._id = id;
    }

    return ChatsReactive.findOne(selector);
};

Chats.subscribtion = () => withFilter(() => pubsub.asyncIterator(topics.CHAT), (payload, args) => {
  return subscriptionFilter(payload, args);
});

Chats.attachSchema(ChatsSchema);
