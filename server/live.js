import { makeExecutableSchema } from 'graphql-tools';
import { MongoObservable } from 'meteor-rxjs';
import { runGraphQLServer } from 'meteor-graphql-rxjs';

import schema from '../imports/graphql/schema';
import resolvers from '../imports/graphql/resolvers/live';

import { ChatsReactive } from '../imports/collections/Chats';
import { MessagesReactive } from '../imports/collections/Messages';
import { MembersReactive } from '../imports/collections/Members';

for (let i = 1; i <= 1000; i++) {
    Meteor.setTimeout(() => {
        MembersReactive.insert({name: `Niccolo' Belli entry #${i}`});
        console.log(`Inserted Niccolo' Belli entry #${i}`);
        }, i * 5000);
}

const executableSchema = makeExecutableSchema({
    typeDefs: [schema],
    resolvers
});

const defaultQuery = `
query {
  allMembers @live {
     name
   }
 }
`;

Meteor.startup(() => {
    const sub = runGraphQLServer(Npm.require, {
        schema: executableSchema,
        graphiql: true,
        graphiqlQuery: defaultQuery,
        createContext: (payload) => ({
            ChatsReactive,
            MessagesReactive,
            MembersReactive
        }),
    })
        .subscribe(undefined, (error) => {
            console.error('GraphQL Server Failed:', error);
        });
});