import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blank" },
      { name: "description", content: "Un sitio web en blanco." },
      { property: "og:title", content: "Blank" },
      { property: "og:description", content: "Un sitio web en blanco." },
    ],
  }),
  component: Index,
});

function Index() {
  return <main className="min-h-screen bg-background" />;
}
