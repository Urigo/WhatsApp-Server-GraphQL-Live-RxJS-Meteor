import { makeExecutableSchema } from 'graphql-tools';
import { runGraphQLServer } from 'meteor-graphql-rxjs';

import schema from '../imports/graphql/schema';
import resolvers from '../imports/graphql/resolvers';

const executableSchema = makeExecutableSchema({
    typeDefs: [schema],
    resolvers: resolvers
});

Meteor.startup(() => {
    const sub = runGraphQLServer(Npm.require, {
        schema: executableSchema,
        graphiql: true,
        createContext: (payload) => ({

        }),
    })
        .subscribe(undefined, (error) => {
            console.error('GraphQL Server Failed:', error);
        });
});