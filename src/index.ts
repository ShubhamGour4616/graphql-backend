import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: `
        type Query {
          hello: String
          post(id: String): String
        }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey`,
        post: (_, { id }: { id: String }) => `id is: ${id}`,
      },
    },
  });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({ messages: "server is running" });
  });

  app.listen(PORT, () => {
    console.log(`running at port : ${PORT}`);
  });
}
init();
