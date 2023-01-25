import { useRouter } from "next/router";
import { ReactNode } from "react";
import styled from "styled-components";
import { DocumentListMenu } from "./DocumentListMenu";
import { MainMenu } from "./MainMenu";
import { Navbar } from "./Navbar";

const Wrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background: white;
`;

const Contents = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
`;

export const Layout = ({ children }: { children: ReactNode }) => {
  const { query } = useRouter();

  const viewingDocumentType = query.documentType;

  if (
    typeof viewingDocumentType !== "string" &&
    typeof viewingDocumentType !== "undefined"
  ) {
    console.error(`Could not find document type "${viewingDocumentType}`);
    return (
      <Wrapper>
        <Navbar />
        Loading...
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar />
      <Contents>
        <MainMenu />
        {viewingDocumentType && (
          <DocumentListMenu documentType={viewingDocumentType} />
        )}
        {children}
      </Contents>
    </Wrapper>
  );
};
