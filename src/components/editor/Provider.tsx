import { createConfig } from "@/sanity.config";
import { ReactNode, useEffect, useState } from "react";
import { StudioProvider } from "sanity";
import { Layout } from "./Layout";
import { useIsInEditor } from "./useIsInEditor";

// Put the studio provider and site fetch here so that the queries are not run for every editor navigation
export const Provider = ({ children }: { children: ReactNode }) => {
  const isInEditor = useIsInEditor();
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    if (!isInEditor) return;

    // Simulate fetching some data necessary for the editor
    new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
      setIsFetchingData(false)
    );
  }, [isInEditor]);

  // Non-editor routes
  if (!isInEditor) return <>{children}</>;

  if (isFetchingData) return <Layout>Loading...</Layout>;

  return (
    <StudioProvider config={createConfig()}>
      <Layout>{children}</Layout>
    </StudioProvider>
  );
};
