import {
  // PortableTextTextBlock,
  // PortableTextSpan,
  // CustomValidator,
  defineConfig,
  defineField,
  // isPortableTextTextBlock,
  // Rule as RuleType,
  // ValidationError,
} from "sanity";
import { deskTool } from "sanity/desk";
// import { deskTool } from "sanity/desk";
// import { visionTool } from "@sanity/vision";
// import { richTextHasContent, sanityConfig } from "@libry-content/common";
// import { LocalizedInput } from "./src/components/editor/form/LocalizedInput";
// import { Navbar } from "./src/components/editor/studio/Navbar";
// import { LanguageCode } from "@libry-content/localization";
// import isEmpty from "lodash/isEmpty";
// import isObject from "lodash/isObject";
// import isString from "lodash/isString";
// import sum from "lodash/sum";

// const localizedError = (message: string, languageCodes: LanguageCode[]): ValidationError => ({
//   message,
//   paths: languageCodes.map((code) => [code]),
// });

// const isRichText = (item: unknown): item is PortableTextTextBlock<PortableTextSpan>[] =>
//   Array.isArray(item) && item.every(isPortableTextTextBlock);

// const richTextLength = (blocks: PortableTextTextBlock<PortableTextSpan>[]): number =>
//   sum(blocks.flatMap(({ children = [] }) => children.map(({ text = "" }) => text.length)));

// const richTextTooLong = (item: unknown, max: number) => isRichText(item) && richTextLength(item) > max;

// const stringTooLong = (item: unknown, max: number) => isString(item) && item.length > max;

// @ts-ignore TODO
// export const hasValue = (item: unknown): boolean => (isRichText(item) ? richTextHasContent(item) : !isEmpty(item));

// const requiredInLanguages =
//   (languages: LanguageCode[]): CustomValidator =>
//   (value) => {
//     if (!isObject(value)) return localizedError("Feltet må fylles ut", languages);

//     const missingLanguages = languages.filter((code) => !hasValue(value?.[code]));
//     return missingLanguages.length ? localizedError("Feltet må fylles ut", missingLanguages) : true;
//   };

// const linkAnnotation = {
//   name: "link",
//   title: "Lenke",
//   type: "object",
//   fields: [
//     {
//       name: "href",
//       title: "URL",
//       type: "url",
//       validation: (Rule) =>
//         Rule.uri({
//           scheme: ["http", "https", "mailto", "tel", "geo", "gemini"],
//         }),
//     },
//   ],
// };

const getSchemaTypes = () => [
  // {
  //   name: "event",
  //   title: "Arrangementer",
  //   type: "document",
  //   fields: [
  //     defineField({
  //       name: "title",
  //       title: "Tittel",
  //       type: "localizedString",
  //     }),
  //   ],
  // },
  {
    name: "service",
    title: "Tjenester",
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Tittel",
        type: "localizedString", // TODO: Try to reproduce without localizing
        // validation: (Rule: RuleType) => Rule.custom(requiredInLanguages(languages)),
      }),
      // defineField({
      //   name: "body",
      //   title: "Tekst",
      //   type: "localizedRichTextBlock",
      //   // validation: (Rule: RuleType) => Rule.custom(requiredInSiteLanguages), TODO
      // }),
      // defineField({
      //   name: "image",
      //   title: "Bilde",
      //   type: "imageWithMetadata",
      // }),
      // defineField({
      //   type: "reference",
      //   to: [{ type: "serviceType" }],
      //   name: "serviceType",
      //   title: "Tjenestetype",
      // }),
    ],
  },
  // {
  //   name: "serviceType",
  //   title: "Tjenestetype",
  //   type: "document",
  //   fields: [
  //     defineField({
  //       name: "title",
  //       title: "Tittel",
  //       type: "localizedString",
  //       validation: (Rule: RuleType) => Rule.custom(requiredInLanguages(languages)),
  //     }),
  //   ],
  // },
  // Make special types like in Forrigebok:
  defineField({
    name: "localizedString",
    title: "Lokalisert streng",
    type: "object",
    fields: [{ name: "nb", title: "Bokmål", type: "string" }],
  }),
  // defineField({
  //   name: "richTextBlock",
  //   type: "array",
  //   of: [
  //     {
  //       type: "block",
  //       styles: [
  //         { title: "Normal", value: "normal" },
  //         { title: "Overskrift", value: "h2" },
  //       ],
  //       lists: [{ title: "Punktliste", value: "bullet" }],
  //       marks: {
  //         decorators: [],
  //         annotations: [linkAnnotation],
  //       },
  //     },
  //     // {
  //     //   type: "table", TODO
  //     // },
  //   ],
  // }),
  // defineField({
  //   name: "localizedRichTextBlock",
  //   title: "Lokalisert rik tekst",
  //   type: "object",
  //   fields: [{ name: "nb", title: "Bokmål", type: "richTextBlock" }],
  // }),
  // defineField({
  //   name: "imageWithMetadata",
  //   title: "Bilde",
  //   type: "image",
  //   options: { hotspot: true },
  //   fields: [
  //     {
  //       name: "creator",
  //       title: "Opphavsperson",
  //       type: "string",
  //       options: { isHighlighted: true },
  //       hidden: ({ parent }) => !parent?.asset,
  //     },
  //   ],
  // }),
];

const projectId = "rq9tvm6g";
const dataset = "test";

// const isLocalizedStringSchemaType = ({ name }: SchemaType) => name === "localizedString";

// export const createConfig = () =>
// defineConfig({
//   // name: "editor",
//   basePath: "/editor",
//   projectId,
//   dataset,
//   schema: { types: getSchemaTypes() },
// });

export const createConfig = () =>
  defineConfig([
    {
      name: "editor",
      basePath: "/editor",
      projectId,
      dataset,
      schema: { types: getSchemaTypes() },
    },
    {
      name: "studio",
      basePath: "/studio",
      projectId,
      dataset,
      schema: { types: getSchemaTypes() },
      plugins: [deskTool()],
    },
  ]);
