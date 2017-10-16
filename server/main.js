import connect from 'connect';
import bodyParser from 'body-parser';
import cors from 'cors';

import { WebApp } from 'meteor/webapp';
import { graphqlConnect, graphiqlConnect } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import schema from '/imports/graphql/schema';
import resolvers from '/imports/graphql/resolvers';

import './startup';

const executableSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers
});
const app = connect();
const subscriptionPort = 3100;

// GraphQL
app.use('/graphql', cors());
app.use('/graphql', bodyParser.json());
app.use('/graphql', graphqlConnect({ schema: executableSchema }));
// GraphiQL
app.use('/graphiql', graphiqlConnect({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${subscriptionPort}`
}));

function startSubscriptionServer() {
	SubscriptionServer.create({
		schema: executableSchema,
		execute,
		subscribe,
	},
	{
		port: subscriptionPort,
		host: '0.0.0.0'
	});

	console.log('GraphQL Subscription server runs on port:', subscriptionPort);
}

WebApp.onListening(() => {
	startSubscriptionServer();
});

WebApp.connectHandlers.use(app);
