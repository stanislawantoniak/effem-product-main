const { gql } = require('apollo-server');

const typeDefs = gql`

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

