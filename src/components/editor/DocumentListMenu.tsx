// import { Flex, Spinner } from "@biblioteksentralen/js-utils";
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
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { useDocumentTypeSchema } from "./useDocumentTypeSchema";

const documentIsDraft = ({ _id }: { _id: string }) => isDraftId(_id);

/** Treats published and drafts versions of the same document as equal */
const documentsAreEqual = (
  { _id: id1 }: SanityDocument,
  { _id: id2 }: SanityDocument
) => documentIdEquals(id1, id2);

const DocumentListMenu = ({
  documentType,
}: {
  documentType: SanityDocument["_type"];
}) => {
  const documentStore = useDocumentStore();
  const { query } = useRouter();
  const documentTypeSchema = useDocumentTypeSchema(documentType);
  const [documents, setDocuments] = useState<SanityDocument[] | undefined>(
    undefined
  );

  useEffect(() => {
    const docQuery = groq`*[ _type == $documentType]{ _id, _updatedAt, title }`;
    const docObservable = documentStore.listenQuery(
      docQuery,
      { documentType },
      { throttleTime: 300 }
    );

    const next = (updatedDocs: SanityDocument[]) => {
      const updatedDocsDraftsFirst = orderBy(
        updatedDocs,
        documentIsDraft,
        "desc"
      );
      const updatedDocsDraftsPreferred = uniqWith(
        updatedDocsDraftsFirst,
        documentsAreEqual
      );
      const updatedDocsOrderedByUpdate = orderBy(
        updatedDocsDraftsPreferred,
        "_updatedAt",
        "desc"
      );

      setDocuments(updatedDocsOrderedByUpdate);
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
        {!documents && <div>Loading...</div>}
        {documents?.map((document) => (
          <MenuItem
            key={document._id}
            selected={getPublishedId(document._id) === query.documentId}
            href={`/editor/${documentType}/${getPublishedId(document._id)}`}
            // @ts-ignore
            title={document?.title?.nb}
          />
        ))}
      </Menu>
    </>
  );
};

// export default memo(DocumentListMenu);
export default DocumentListMenu;
