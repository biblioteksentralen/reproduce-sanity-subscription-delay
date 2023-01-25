import styled from "styled-components";
import { ReactNode } from "react";

const Heading = styled.h2`
  font-size: 1rem;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
  width: 100%;
  white-space: nowrap;
  padding: 1rem;
`;

const Section = styled.section`
  border-right: 1px solid lightgray;
  height: 100%;
`;

const List = styled.ul`
  padding: 0;
  margin-top: 0;
  width: 100%;
  list-style: none;
`;

export const Menu = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => (
  <Section role="menu">
    {title && <Heading>{title}</Heading>}
    <List>{children}</List>
  </Section>
);
