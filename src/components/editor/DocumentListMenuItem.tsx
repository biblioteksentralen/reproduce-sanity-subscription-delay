import { useDocumentValues } from "sanity";
import { MenuItem } from "./MenuItem";

const valuePaths = ["title"];

export const DocumentListMenuItem = ({
  documentId,
  href,
  selected,
}: {
  documentId: string;
  href: string;
  selected: boolean;
}) => {
  const documentValues = useDocumentValues<{ title?: { nb?: string } }>(
    documentId,
    valuePaths
  );

  const title =
    typeof documentValues?.value?.title?.nb === "string"
      ? documentValues?.value?.title?.nb
      : "...";

  return <MenuItem href={href} selected={selected} title={title} />;
};
