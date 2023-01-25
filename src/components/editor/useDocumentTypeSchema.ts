import { useMemo } from "react";
import { isObjectSchemaType, ObjectSchemaType, useSchema } from "sanity";

export const useDocumentTypeSchema = (
  documentTypeName: string | undefined
): ObjectSchemaType | undefined => {
  const schema = useSchema();

  return useMemo(() => {
    if (typeof documentTypeName !== "string") return undefined;

    const typeSchema = schema.get(documentTypeName);
    if (isObjectSchemaType(typeSchema)) return typeSchema;

    if (!typeSchema) {
      console.error(`Could not find schema for "${documentTypeName}"`);
    } else {
      console.error(`Found non-object type schema for "${documentTypeName}"`);
    }
  }, [documentTypeName, schema]);
};
