import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
// import { useRouter } from "next/router";
import { createConfig } from "@/sanity.config";

export default function StudioPage(/*props*/) {
  // const { ts } = useTranslation();
  // const { query } = useRouter();
  // const [site, setSite] = useState<ResolvedSite | undefined>(undefined);

  // useEffect(() => {
  //   if (typeof query.site !== "string") {
  //     console.error("Could not get site from route query");
  //     return;
  //   }

  //   fetchSiteQuery<SitePageProps>(groq`{}`, { siteDomain: query.site })
  //     .then(({ data }) => setSite(data?.site ?? undefined))
  //     .catch(console.error);
  // }, [query.site]);

  // if (!site?.defaultLanguage || !isLanguageCode(site?.defaultLanguage)) {
  //   return (
  //     <Flex justifyContent="center" alignItems="center" height="100vh">
  //       <Spinner size="lg" />
  //     </Flex>
  //   );
  // }

  return (
    <>
      <Head>
        <NextStudioHead />
      </Head>
      <NextStudio config={createConfig()} />
    </>
  );
}
