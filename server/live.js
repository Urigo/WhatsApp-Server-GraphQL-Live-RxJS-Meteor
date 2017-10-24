import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({
    typeDefs: `
  type Message {
    content: String
  }
  
  type Query {
    allMessages: [Message]
  }
  `,
    resolvers: {
        Query: {
            allMessages: (root, args, ctx) => {
                return [{content: "1"}, {content: "2"}, {content: "3"}];
            },
        },
    },
});

import { runGraphQLServer } from 'meteor-graphql-rxjs';

Meteor.startup(() => {
    const sub = runGraphQLServer(Npm.require, {
        schema,
        createContext: (payload) => ({

        }),
    })
        .subscribe(undefined, (error) => {
            console.error('GraphQL Server Failed:', error);
        });
});