import type { SerializedLinkNode } from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { type JSXConvertersFunction, LinkJSXConverter, RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";

/** Links to other CMS documents point at their page on the site. */
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc;
  if (!doc || typeof doc.value !== "object") return "/";
  const { slug, _status } = doc.value as { slug?: string; _status?: string };
  const live = Boolean(slug) && _status !== "draft";
  if (doc.relationTo === "posts") return live ? `/blog/${slug}` : "/blog";
  if (doc.relationTo === "trips") return live ? `/trips/${slug}` : "/trips";
  return "/";
};

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
});

export function RichText({ data, className = "" }: { data: SerializedEditorState; className?: string }) {
  return <PayloadRichText data={data} converters={converters} className={`rich-text ${className}`} />;
}
