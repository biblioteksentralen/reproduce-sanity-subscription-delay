import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  // getDraftId,
  ObjectSchemaType,
  // useDocumentValues,
  useDocumentOperation,
  useDocumentStore,
  // usePresenceStore,
  // useValidationStatus,
  ValidationMarker,
  SanityDocument,
  ObjectField,
  StringSchemaType,
  SchemaType,
} from "sanity";
import { StringInput } from "./StringInput";
import { getValidationMarkers } from "./getValidationMarkers";

const Section = styled.section`
  width: 100%;
  height: 100%;
  align-items: flex-start;
`;

const Heading = styled.h2`
  font-size: 1rem;
  border-bottom: 1px solid lightgray;
  width: 100%;
  padding: 1rem;
`;

const Form = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const isStringField = (
  field: ObjectField<SchemaType>
): field is ObjectField<StringSchemaType> => field.type.name === "string";

export const DocumentEditor = ({
  id,
  documentTypeSchema,
}: {
  id: string;
  documentTypeSchema: ObjectSchemaType;
}) => {
  const documentType = documentTypeSchema.name;
  const documentStore = useDocumentStore();

  const [document, setDocument] = useState<SanityDocument | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const editStateObserver = documentStore.pair.editState(id, documentType);
    editStateObserver.subscribe({
      next: ({ draft, published, ready }) => {
        setDocument(draft ?? published ?? undefined);
        setIsLoading(!ready);
      },
      error: (...args) => console.error("😱 editStateObserver ERROR", ...args),
    });
  }, [id, documentStore, documentType]);

  const [validationMarkers, setValidationMarkers] = useState<
    ValidationMarker[]
  >([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const validationObserver = documentStore.pair.validation(id, documentType);
    validationObserver.subscribe({
      next: ({ isValidating: validating, validation }) => {
        setValidationMarkers(validation);
        setIsValidating(validating);
      },
      error: (...args) => console.error("😱 validationObserver ERROR", ...args),
    });
  }, [id, documentStore, documentType]);

  // const presenceStore = usePresenceStore();

  // useEffect(() => {
  //   presenceStore.setLocation([{ type: "document", documentId: id, lastActiveAt: "", path: [] }]);
  //   const next = (...args) => console.log("👤 DOCUMENT PRESENCE", ...args);
  //   presenceStore.documentPresence(id).subscribe({ next });
  // }, [id, presenceStore]);

  // const {
  //   value: publishedDocument,
  //   error: publishedError,
  //   isLoading: publishedLoading,
  // } = useDocumentValues<SanityDocument>(id, documentFieldNames);

  // const {
  //   value: draftDocument,
  //   error: draftError,
  //   isLoading: draftLoading,
  // } = useDocumentValues<SanityDocument>(getDraftId(id), documentFieldNames);

  // const document = draftDocument ?? publishedDocument;
  // const error = draftDocument ? draftError : publishedError;
  // const isLoading = draftDocument ? draftLoading : publishedLoading;

  const { patch } = useDocumentOperation(id, documentTypeSchema.name);
  // const { validation } = useValidationStatus(id, documentTypeSchema.name);

  if (!isLoading && !document) {
    console.error("Could not find value for document", id);
    return null;
  }

  return (
    <Section>
      <Heading>
        {/* @ts-ignore */}
        {(isLoading ? "Laster..." : document?.title) ?? "Ukjent dokument"}
      </Heading>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Form>
          {documentTypeSchema.fields
            .filter(isStringField)
            .map(({ name, type }) => (
              <StringInput
                key={name}
                document={document!}
                path={[name]}
                patch={patch}
                type={type}
                validation={getValidationMarkers(validationMarkers, name)}
              />
            ))}
        </Form>
      )}
    </Section>
  );
};
