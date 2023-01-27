import {
  ObjectFieldType,
  Path,
  pathToString,
  SanityDocument,
  SchemaType,
  ValidationMarker,
} from "sanity";
import { PatchOperation, useStringValue } from "./useStringValue";

type StringInputProps = {
  document: SanityDocument;
  path: Path;
  patch: PatchOperation;
  type: ObjectFieldType<SchemaType>;
  validation?: ValidationMarker[];
};

export const StringInput = ({
  document,
  path,
  type,
  patch,
  validation,
}: StringInputProps) => {
  const [value, setValue] = useStringValue(document, path, patch);
  const errorMessage = validation?.[0]?.item?.message;

  return (
    <div>
      <label>{type.title ?? pathToString(path)}</label>
      <br />
      <input
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
      />
      {errorMessage && <div>ERROR: {errorMessage}</div>}
    </div>
  );
};
