import { sanitizeSchema } from "."

async function run() {
  const source = `
  type Query {
    foo: String
  }

  type Query {
    bar: String
  }
  `
  console.log(sanitizeSchema(source))
}

run()