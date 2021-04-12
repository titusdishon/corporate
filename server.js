import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { typeDefs } from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import { authenticateToken } from "./middleWares/authentication.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5781;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => {
    const token =req.headers&&req.headers.authorization&&req.headers.authorization.split(" ")[1] || null;
    const user = authenticateToken(token&&token.trim());
    return { user };
  },
});

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Server running on address=>:http://localhost:${port}`);
    return server.listen({ port: port });
  })
  .catch((error) => {
    console.log("Error encountered:", error);
  });
