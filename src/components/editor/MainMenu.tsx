import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { isObjectSchemaType, useSchema } from "sanity";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

const mainDocumentTypes = ["event", "service"] as const;
// const documentTypeSchemas: { name: string; title: string }[] = [];
export const MainMenu = () => {
  const schema = useSchema();
  const { query } = useRouter();

  const documentTypeSchemas = useMemo(
    () =>
      mainDocumentTypes
        .map((name) => schema.get(name))
        .filter(isObjectSchemaType),
    [schema]
  );

  return (
    <Menu title="Meny">
      {documentTypeSchemas.map(({ name, title }) => (
        <MenuItem
          key={name}
          href={`/editor/${name}`}
          title={title}
          selected={name === query.documentType}
        />
      ))}
    </Menu>
  );
};
