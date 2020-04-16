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
  """Unique ID of the product."""
  id: ID!
  systemId: String
  """Name of the product to be used in product feature pages."""
  name: String
  """Brand of the product"""
  brand: String 
  """Description that is used to higlight product features to be used on product feature page. Note that new lines are presented as \n so you need to replace them with proper HTM line breaks markup before displaying."""
  description: String
  cost: Float @auth(requires: ADMIN)
  """Internal product name used in MARS backoffice system."""
  SAPProductTitle: String @auth(requires: ADMIN)
  """Suggested retail price."""
  suggestedRetailPrice: Float
  """Product weight in kg."""
  weight: Float
}

type Query {
  """This query returns 1000 products per page. It is intended for use in product listings. Result paging to be implemented yet. We recommend to use properties very selectively."""
  products: [Product]!
  """This query returns product by its ID. We recommend to use this query when displaying given product page."""
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

