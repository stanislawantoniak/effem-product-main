const { gql } = require('apollo-server');

const typeDefs = gql`

directive @auth(
  requires: Role = ADMIN,
) on FIELD_DEFINITION

enum Role {
  ADMIN
  USER
  UNDEFINED
}

type Product @key(fields: "id") {
  id: ID!
  systemId: String
  name: String
  brand: String @auth(requires: ADMIN)
  description: String 
  cost: Float @auth(requires: ADMIN)
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

