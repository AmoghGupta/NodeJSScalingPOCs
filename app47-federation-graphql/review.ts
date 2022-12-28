import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const reviews = [
  { id: "1", score: "7.5", comments: ['Great movie', 'First and unique!'], product: { id: "1" } },
  { id: "2", score: "7.0", comments: ['Amazing!', 'Love this one!'], product: { id: "2" } },
  { id: "3", score: "9.0", comments: ['Childhood memories!', 'Really good!'], product: { id: "3" } },
];

const typeDefs = gql`
  type Query {
    reviews: [Review]
  }
  type Review {
    id: ID!
    score: String
    comments: [String]
    product: Product!
  }
  extend type Product @key(fields: "id") {
    id: ID! @external
    quantity: Int
  }
`;

const resolvers = {
  Query: {
    reviews() {
      return reviews;
    },
  },
  Product: {
    reviews(parent, _args, __context, ___info) {
      return reviews.filter(review => review.product.id === parent.id);
    }
  },
  Review: {
    product(review) {
      return {
        // __typename: 'Product',
        id: review.product.id
      };
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Review service ready at ${url}`);
});