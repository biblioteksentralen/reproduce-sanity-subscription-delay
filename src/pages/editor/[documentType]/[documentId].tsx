import { useDocumentTypeSchema } from "@/components/editor/useDocumentTypeSchema";
import { useRouter } from "next/router";
import { EditorForm } from "@/components/editor/EditorForm";

export default function DocumentTypeForm() {
  const { query } = useRouter();
  const documentTypeSchema = useDocumentTypeSchema(
    typeof query.documentType === "string" ? query.documentType : undefined
  );

  if (!documentTypeSchema || typeof query.documentId !== "string") {
    return <div>NOT FOUND</div>;
  }

  return (
    <EditorForm documentTypeSchema={documentTypeSchema} id={query.documentId} />
  );
}
