import { ApolloServer } from "apollo-server";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AppointmentsResolver } from "./resolvers/appointments-resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      AppointmentsResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })
  const server = new ApolloServer({
    schema,
  })

  const { url } = await server.listen()

  console.log(`Server is running on ${url}`)
}


bootstrap();