import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import * as DataLoader from "dataloader";

const products = [
    { id: "1", title: "Batman", year: "1989" },
    { id: "2", title: "Batman Returns", year: "1992" },
    { id: "3", title: "Batman: The Animated Series", year: "1992" },
];

const directors = [
    { id: "1", name: "ABC" },
    { id: "2", name: "DEF" },
    { id: "3", name: "XYZ" },
];

const typeDefs = gql`
  type Query {
    products(id: String): [Product]
    catalogue: Catalogue
  }
  type Product @key(fields: "id") {
    id: ID!
    productDetails: ProductDetails
    directors: Director
  }
  type Director{
    id: ID,
    name: String
  }
  type Catalogue{
    id: ID!,
    name: String,
    products: [Product]
  }
  type ProductDetails {
    id: ID!
    title: String
    year: String
  }
`;
const batchProductDetails = async (ids: string[]) => {
    console.log("Batched Product IDs " + ids);
    // return ids.map((id) => productDetailsRequest(id));
    return ids.map(id => products[id as any - 1]);
}

const productDetailsResolver = (parent, args, { dataloaders }, info) => {
    return dataloaders.productDetailLoader.load(parent.id);
}

const batchDirectorsData = async (ids: string[]) => {
    // return ids.map((id) => directorsRequest(id));
    console.log("Batched Directors IDs " + ids);
    return ids.map(id => directors[id as any - 1]);
}

const directorsRequest = (id: string) => {
    console.log("Director ID: " + id);
    return directors.find((director) => director.id === id);
}
const directorsResolver = (parent, args, { dataloaders }, info) => {
    return directorsRequest(parent.id);
}

const resolvers = {
    Query: {
        products(_p, args) {
            return products.filter((product) => product.id === args.id);
        },
        catalogue() {
            const catalogue = {
                id: 123,
                name: 'test',
                productIds: ['1', '2', '3']
            }
            return {
                ...catalogue,
                products: catalogue.productIds.map((id) => {
                    return {
                        id
                    }
                })
            };
        }
    },

    Product: {
        productDetails: productDetailsResolver,
        directors: directorsResolver,
        // needed when there is a cyclic dependency
        // __resolveReference(productId) {
        //     console.log("")
        //     return products.filter(product => product.id === productId);
        // }
    },
    // Catalogue: {
    //     products: productResolver
    // }`
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    context: (_req, _res) => {
        return {
            dataloaders: {
                productDetailLoader: new DataLoader(batchProductDetails as any),
                directorsLoader: new DataLoader(batchDirectorsData as any)
            },
        };
    },
});

server.listen(4001).then(({ url }) => {
    console.log(`🚀 Content service ready at ${url}`);
});