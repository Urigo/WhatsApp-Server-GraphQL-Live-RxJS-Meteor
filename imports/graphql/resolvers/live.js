import { GraphQLDateTime } from 'graphql-iso-date';

import Chat from './entities/Chat';
import Member from './entities/Member';
import Message from './entities/Message';
import Query from './Query_live';
import Mutation from './Mutation';
import Subscription from './Subscription';

export default {
    Chat,
    Member,
    Message,
    Query,
    Mutation,
    Subscription,
    DateTime: GraphQLDateTime
};