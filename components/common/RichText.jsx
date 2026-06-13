import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";

// Renders Payload Lexical rich-text. Safe no-op when empty.
export default function RichText({ data, className }) {
  if (!data) return null;
  return <LexicalRichText data={data} className={className} />;
}
