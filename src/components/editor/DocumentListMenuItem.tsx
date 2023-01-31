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
  const documentValues = useDocumentValues(documentId, valuePaths);
  const title =
    typeof documentValues?.value?.title === "string"
      ? documentValues?.value?.title
      : "...";

  return <MenuItem href={href} selected={selected} title={title} />;
};
