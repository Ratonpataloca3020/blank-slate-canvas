import { useEffect } from "react";

const BASE_TITLE = "Lexflex | Estudio Jurídico en Huancayo";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function useSeo({ title, description }: { title?: string; description?: string }) {
  useEffect(() => {
    document.title = title ? `${title} | Lexflex` : BASE_TITLE;
    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
    }
    setMeta('meta[property="og:title"]', "property", "og:title", document.title);
  }, [title, description]);
}
