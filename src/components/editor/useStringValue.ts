import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Operation,
  Path,
  getValueAtPath,
  pathToString,
  SanityDocument,
} from "sanity";

export type SetOperation = string | { [key: string]: unknown };
export type Patch = { set: SetOperation };

export type PatchOperation = Operation<
  [patches: Patch[], initialDocument: Record<string, any>]
>;

const UPDATE_VALUE_DELAY_MS = 300;

export const useStringValue = (
  document: SanityDocument,
  fieldPath: Path,
  patch: PatchOperation,
  initialValue = ""
): [string, (newValue: string) => void] => {
  const fieldValue = getValueAtPath(document, fieldPath);
  const [value, setValue] = useState(initialValue);
  const [isUpdating, setIsUpdating] = useState(false);
  const [pendingPatch, setPendingPatch] = useState<Patch | undefined>(
    undefined
  );

  // Use string version to aid memoization
  const pathAsString = pathToString(fieldPath);

  // Update field value in dataset according to form state
  const updateFieldValue = useMemo(
    () =>
      debounce((newValue) => {
        const setOperation = pathAsString
          .split(".")
          .reverse()
          .reduce((acc: SetOperation, pathSegment) => {
            if (typeof pathSegment !== "string") {
              throw new Error("Not implemented array paths in useFormValue");
            }
            return { [pathSegment]: acc };
          }, newValue);

        setPendingPatch({ set: setOperation });
      }, UPDATE_VALUE_DELAY_MS),
    [pathAsString]
  );

  // Do this in own effect so that updateFieldValue won't have to depend on patch, which is not memoized
  useEffect(() => {
    if (!pendingPatch) return;

    // Use callback version of setState so that updates in patch don't lead to superfluous patch.execute
    setPendingPatch((currentPendingPatch) => {
      if (currentPendingPatch) patch.execute([currentPendingPatch], {});
      return undefined;
    });
  }, [patch, pendingPatch]);

  // Finished updating field value in dataset according to form state
  useEffect(() => {
    if (isUpdating && fieldValue === value) setIsUpdating(false);
  }, [fieldValue, isUpdating, value]);

  // Update form state according to field value in dataset
  useEffect(() => {
    if (!isUpdating && fieldValue !== value && typeof fieldValue === "string") {
      setValue(fieldValue);
    }
  }, [fieldValue, isUpdating, value]);

  const onChangeValue = useCallback(
    (newValue: string) => {
      setIsUpdating(true);
      updateFieldValue(newValue);
      setValue(newValue);
    },
    [updateFieldValue]
  );

  return [value, onChangeValue];
};
