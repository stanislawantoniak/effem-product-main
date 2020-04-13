const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
	// Visitor methods for nested types like fields and arguments
	// also receive a details object that provides information about
	// the parent and grandparent types.
	visitFieldDefinition(field) {

		field._requiredAuthRole = this.args.requires;

		const { resolve = defaultFieldResolver } = field;
		field.resolve = async function(...args) {

			const context = args[2];
			const user = context.user;
			console.log('AuthDirective->user:', user);
			const requiredRole = field._requiredAuthRole;
			console.log('AuthDirective->requiredRole:', requiredRole);

			var result = await resolve.apply(this, args);
			
			if (!user.role.split(',').includes(requiredRole)) {
				if (typeof result === "string") {
					result = '**** unsufficient permissions to see this field ****';
				}
			}

			console.log('AuthDirective->result:', result);
			return result;
		};
	}

}

module.exports = AuthDirective;