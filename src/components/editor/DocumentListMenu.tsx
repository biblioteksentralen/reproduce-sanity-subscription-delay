import isEqual from "lodash/isEqual";
import orderBy from "lodash/orderBy";
import uniqWith from "lodash/uniqWith";
import { groq } from "next-sanity";
import { useRouter } from "next/router";
import { /*memo,*/ useEffect, useState } from "react";
import {
  useDocumentStore,
  getPublishedId,
  isDraftId,
  documentIdEquals,
  type SanityDocument,
} from "sanity";
import { DocumentListMenuItem } from "./DocumentListMenuItem";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { useDocumentTypeSchema } from "./useDocumentTypeSchema";

const DocumentListMenu = ({
  documentType,
}: {
  documentType: SanityDocument["_type"];
}) => {
  const documentStore = useDocumentStore();
  const { query } = useRouter();
  const documentTypeSchema = useDocumentTypeSchema(documentType);
  const [documentIds, setDocumentIds] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    const docQuery = groq`*[ _type == $documentType]._id | order(_updatedAt)`;
    const docObservable = documentStore.listenQuery(
      docQuery,
      { documentType },
      { throttleTime: 300 }
    );

    const next = (updatedIds: string[]) => {
      const updatedDocsDraftsFirst = orderBy(updatedIds, isDraftId, "desc");
      const updatedDocsDraftsPreferred = uniqWith(
        updatedDocsDraftsFirst,
        documentIdEquals
      );

      setDocumentIds((current) =>
        isEqual(current, updatedDocsDraftsPreferred)
          ? current
          : updatedDocsDraftsPreferred
      );
    };

    docObservable.subscribe({
      next,
      error: (...args) => console.error("😱 documentObservable ERROR", ...args),
    });
  }, [documentStore, documentType]);

  if (!documentTypeSchema) return null;

  return (
    <>
      <Menu title={documentTypeSchema?.title}>
        {!documentIds && <div>Loading...</div>}
        {documentIds?.map((id) => (
          <DocumentListMenuItem
            key={id}
            documentId={id}
            selected={getPublishedId(id) === query.documentId}
            href={`/editor/${documentType}/${getPublishedId(id)}`}
          />
        ))}
      </Menu>
    </>
  );
};

// export default memo(DocumentListMenu);
export default DocumentListMenu;
