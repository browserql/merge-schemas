import { buildSchema, DefinitionNode, Kind, parse, print } from 'graphql'

const extendError = /There can be only one type named "(.+)"\./;

export function sanitizeSchema(source: string, iterations = 0, limit = 2): string {
  try {
    buildSchema(source);
    return source;
  } catch (error) {
    if (iterations > limit) {
      throw new Error(`Maximum loop: ${source}`)
    }

    if (error instanceof Error) {
      if (extendError.test(error.message)) {
        const type = error.message.replace(extendError, '$1');
        const { definitions, ...doc } = parse(source);
        let found = false;
        const nextDefs: DefinitionNode[] = definitions.map((def) => {
          if (def.kind === 'ObjectTypeDefinition' && def.name.value === type) {
            if (!found) {
              found = true;
            } else {
              return {
                ...def,
                kind: 'ObjectTypeExtension' as Kind.INTERFACE_TYPE_DEFINITION,
              };
            }
          }
          return def;
        });
        return sanitizeSchema(
          print({
            ...doc,
            definitions: nextDefs,
          }),
          iterations++
        );
      }
    }

    throw error;
  }
}