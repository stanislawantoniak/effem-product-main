const { ApolloServer, AuthenticationError } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { AuthDirective } = require('./authdirective');
const { SchemaDirectiveVisitor } = require('graphql-tools');

const ProductAPI = require('./datasources/product');

const dotenv = require('dotenv');
dotenv.config();

const { buildFederatedSchema } = require('@apollo/federation');

const schema = buildFederatedSchema([{
	typeDefs,
	resolvers
}]);

console.log('1');
SchemaDirectiveVisitor.visitSchemaDirectives(schema, { auth: AuthDirective });
console.log('2');


const server = new ApolloServer({
	schema: schema,
	dataSources: () => ({
		productAPI: new ProductAPI()
	}),
	context: ({ req }) => {
		var userbase64 = req.headers['x-user-data'] || '';

		const user = userbase64 == '' ? { authenticated: false } : JSON.parse(new Buffer(userbase64, 'base64').toString());

		//if (!user.authenticated) throw new AuthenticationError('Unauthorized: You must pass valid user data here.');

		console.log('user from upstream: ', user);
		// add the user to the context
		return { user };
	}
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
