import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const topics = {
  CHAT: 'chat',
  MESSAGE: 'message',
};
