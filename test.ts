import { sanitizeSchema } from "."

async function run() {
  const source = `
  scalar Date

  scalar JSON

  type Handler {
    I: String!
  }

  input HandlerInput {
    label: String!
    I: String!
  }

  type HandlerResult {
    startedAt: Date!
    endedAt: Date!
  }

  type Mutation {
    runHandler(handler: HandlerInput): HandlerResult!
  }

  enum UserType {
    leadPsychiatrist
  }

  type Query {
    start(userType: UserType!): JSON!
  }

  extend type Query {
    ping: Pong
  }

  scalar Pong
  `
  console.log(sanitizeSchema(source))
}

run()