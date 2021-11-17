import { sanitizeSchema } from "."

async function run() {
  const source = `
  type Query {
    """Compose the payload that will be encoded into a JSON Web Token"""
    compose_jwt_payload(variables: ComposeJwtPayloadVariables!): JWTPayload! @command(label: "Compose JSON Web Token payload")
  }
  
  input ComposeJwtPayloadVariables {
    userID: MySQLID!
    role: UserType!
    staffID: MySQLID
    doctorID: MySQLID
    patientID: MySQLID
  }
  
  scalar Date
  
  scalar JSON
  
  type JWTPayload {
    id: MySQLID!
    exp: Int!
    alg: String!
    iss: String!
    aud: UserType!
    sid: MySQLID
    pid: MySQLID
    did: MySQLID
  }
  
  scalar MySQLID
  
  type Mutation {
    runHandler(handler: HandlerInput): HandlerResult!
  }
  
  directive @command(isGroup: Boolean, label: String) on FIELD_DEFINITION
  
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
  
  enum UserType {
    leadPsychiatrist
  }
  
  type Query {
    start(userType: UserType!): JSON!
  }
  
  type Query {
    ping: Pong
  }
  
  scalar Pong
  `
  console.log(sanitizeSchema(source))
}

run()