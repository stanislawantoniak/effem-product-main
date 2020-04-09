const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field) {
 const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === "string") {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

module.exports = AuthDirective;