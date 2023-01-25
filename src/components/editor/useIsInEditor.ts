import { useRouter } from "next/router";

export const useIsInEditor = () => useRouter().asPath.startsWith("/editor");
