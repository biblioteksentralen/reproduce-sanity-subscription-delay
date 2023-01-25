import styled from "styled-components";
import NextLink from "next/link";

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  background: black;
  color: white;
`;

export const Navbar = () => (
  <Wrapper>
    <NextLink href="/editor">Navbar</NextLink>
  </Wrapper>
);
