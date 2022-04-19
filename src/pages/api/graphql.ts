import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import * as jwt from "jsonwebtoken";
import Cors from "micro-cors";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";

const cors = Cors();
const apolloServer = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
  const bearertoken = req.headers.authorization;

    if (!bearertoken || bearertoken === undefined) {
      throw new AuthenticationError('Necessário enviar token para validação.');
    }

    const token = bearertoken.split(" ")[1];

    try {
      const secret: string | undefined = process.env.SECRET;
      const decoded: any = jwt.verify(token, secret || "");
      req.userId = decoded.data.userId;

      return { user: decoded.data.userId};
    } catch (err) {
      throw new AuthenticationError('Token invalido.');
    }

}});

const startServer = apolloServer.start();

export default cors(async function handler(req: any, res: any) {

  if(req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
