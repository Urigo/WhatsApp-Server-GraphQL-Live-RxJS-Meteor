import { makeExecutableSchema } from 'graphql-tools';
import { MongoObservable } from 'meteor-rxjs';
import { runGraphQLServer } from 'meteor-graphql-rxjs';

const Messages = new MongoObservable.Collection('my-messages');

Messages.remove({});

Messages.insert({content: "1"});
Messages.insert({content: "2"});
Messages.insert({content: "3"});

for (let i = 1; i <= 1000; i++) {
    Meteor.setTimeout(() => {
        Messages.insert({content: i+3});
    }, i * 5000);
}

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
                return ctx.Messages.find();
            },
        },
    },
});

const defaultQuery = `
  query {
    allMessages @live {
      content
    }
  }
`;

Meteor.startup(() => {
    const sub = runGraphQLServer(Npm.require, {
        schema,
        graphiql: true,
        graphiqlQuery: defaultQuery,
        createContext: (payload) => ({
            Messages
        }),
    })
        .subscribe(undefined, (error) => {
            console.error('GraphQL Server Failed:', error);
        });
});