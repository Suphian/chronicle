import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Children, isValidElement, type ReactNode } from "react";
import { getBibleEntries, notebookHref } from "@/lib/worldbuilding";
import { ResumeReading } from "@/components/ResumeReading";
import { codex } from "@/content/codex";
import { characterPortraits } from "@/content/portraits";

function headingId(children: ReactNode): string {
  const plain = (nodes: ReactNode): string => Children.toArray(nodes).map((node) => isValidElement<{ children?: ReactNode }>(node) ? plain(node.props.children) : String(node)).join("");
  return plain(children).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s/g, "-");
}

export function generateStaticParams() { return getBibleEntries().map((entry) => ({ path: entry.slug.split("/") })); }

export async function generateMetadata({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return { title: getBibleEntries().find((entry) => entry.slug === path.join("/"))?.title ?? "Story notebook" };
}

export default async function NotebookPage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const entries = getBibleEntries();
  const entry = entries.find((entry) => entry.slug === path.join("/"));
  if (!entry) notFound();
  const person = entry.group === "characters" ? codex.find((person) => person.kind === "person" && entry.slug === `characters/${person.id}`) : undefined;
  const portrait = person ? characterPortraits[person.id] : undefined;
  const parent = entry.group === "characters" ? { href: "/people", label: "People" } : ["places", "factions", "history", "cultures"].includes(entry.group) ? { href: "/world", label: "World" } : { href: "/workshop", label: "Writing room" };
  return <main className="notebook-shell"><div className="notebook-page">
    <Link className="book-location" href={parent.href}>← {parent.label}</Link>
    <ResumeReading />
    <p className="book-eyebrow notebook-label">Full-story spoilers</p>
    <article className="notebook-markdown"><Markdown remarkPlugins={[remarkGfm]} components={{
      h1: ({ children }) => portrait ? <header className="character-dossier-header">
        <div><h1>{children}</h1>{person && <p className="character-dossier-role">{person.role}</p>}</div>
        <figure className="character-dossier-portrait">
          <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} sizes="(max-width: 600px) 220px, 240px" />
          <figcaption>Portrait study</figcaption>
        </figure>
      </header> : <h1>{children}</h1>,
      a: ({ href, children }) => <a href={href ? notebookHref(href, entry.slug, entries) : undefined}>{children}</a>,
      h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
      h3: ({ children }) => <h3 id={headingId(children)}>{children}</h3>,
    }}>{entry.content}</Markdown></article>
  </div></main>;
}
