import { useDocumentTypeSchema } from "@/components/editor/useDocumentTypeSchema";
import { useRouter } from "next/router";
import { DocumentEditor } from "@/components/editor/DocumentEditor";

export default function DocumentTypeForm() {
  const { query } = useRouter();
  const documentTypeSchema = useDocumentTypeSchema(
    typeof query.documentType === "string" ? query.documentType : undefined
  );

  if (!documentTypeSchema || typeof query.documentId !== "string") {
    return <div>NOT FOUND</div>;
  }

  return (
    <DocumentEditor
      documentTypeSchema={documentTypeSchema}
      id={query.documentId}
    />
  );
}
