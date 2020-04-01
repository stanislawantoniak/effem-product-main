const { gql } = require('apollo-server');

const typeDefs = gql`

scalar _Any

# a union of all types that use the @key directive
union _Entity = Product

type _Service {
  sdl: String
}

extend type Query {
  _entities(representations: [_Any!]!): [_Entity]!
  _service: _Service!
}

type Product @key(fields: "id") {
  id: ID!
  systemId: String
  name: String
  brand: String
  description: String
  cost: Float
  SAPProductTitle: String
  retailPrice: Float
}

type Query {
  products: [Product]!
  product(id: ID!): Product
}

type UpdateProductResponse {
  success: Boolean!
  message: String!
  product: Product
}
 
input ProductInput {
  id: String!
  name: String
  brand: String
  description: String
  cost: Float
  sapProductTitle: String
  retailPrice: Float
}

type Mutation {
  updateProduct(product: ProductInput!): UpdateProductResponse
}

`;

module.exports = typeDefs;

