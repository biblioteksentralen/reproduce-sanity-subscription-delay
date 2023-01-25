import styled from "styled-components";
import NextLink from "next/link";

const ListItem = styled.li<{ selected?: boolean }>`
  border-bottom: 1px solid lightgray;
  background: ${({ selected }) => (selected ? "lightblue" : undefined)};

  &:hover {
    background: "lightgray";
  }
`;

const Title = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  padding: 1rem;

  &:hover {
    background: lightgray;
  }
`;

export const MenuItem = ({
  title,
  href,
  selected,
}: {
  title?: string;
  href: string;
  selected?: boolean;
}) => (
  <ListItem selected={selected}>
    <NextLink href={href}>
      <Title>
        <span>{title ?? "Ukjent"}</span>
        <span>{" >"}</span>
      </Title>
    </NextLink>
  </ListItem>
);
