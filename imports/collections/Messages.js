import SimpleSchema from 'simpl-schema';

import { withFilter } from 'graphql-subscriptions';

import { Collection, requiredAfterSet } from '/imports/collections/Collection';
import { Chats } from '/imports/collections/Chats';
import { Members } from '/imports/collections/Members';
import { messageFilter } from '/imports/filters/message';
import { subscriptionFilter } from '/imports/filters/subscriptions';
import { pubsub, topics } from '/imports/graphql/subscriptions';

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

Messages.create = ({authorId, chatId, content}) => {
  const id = Messages.insert({
    author: authorId,
    chat: chatId,
    content
  });

  const record = Messages.findOne({_id: id});

  pubsub.publish(topics.MESSAGE, {
    Message: {
      in_mutation: 'CREATED',
      node: record
    }
  });

  return record;
};

Messages.all = ({filter}) => {
  const selector = messageFilter({}, filter);

  return Messages.find(selector).fetch();
};

Messages.subscribtion = () => withFilter(() => pubsub.asyncIterator(topics.MESSAGE), (payload, args) => {
  return subscriptionFilter(payload, args);
});

Messages.attachSchema(MessagesSchema);