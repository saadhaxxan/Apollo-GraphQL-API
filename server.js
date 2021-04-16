const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const Post = require("./models/Post.model");
const db = require("./db/conn");

async function startSever() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app, path: "/graphql" });
  app.listen(3000, () => console.log("Listening on 3000"));
}

startSever();
