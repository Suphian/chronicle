"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { characterPortraits } from "@/content/portraits";

export function PeopleDirectory({ people }: { people: { id: string; name: string; group: string }[] }) {
  const [query, setQuery] = useState("");
  const visible = people.filter((person) => `${person.name} ${person.group}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <div className="people-directory"><label className="sr-only" htmlFor="people-search">Find a person</label><input id="people-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name or connection…" />
    <p className={query ? "directory-count" : "sr-only"} aria-live="polite">{visible.length} {visible.length === 1 ? "person" : "people"}</p>
    <div className="notebook-cards people-cards">{visible.map((person) => <Link id={person.id} key={person.id} href={`/library/characters/${person.id}`}>{characterPortraits[person.id] && <div className="people-portrait"><Image src={characterPortraits[person.id].src} alt="" fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 280px" className="object-cover" /></div>}<div className="people-card-copy"><span>{person.group}</span><h2>{person.name}</h2></div></Link>)}</div>
    {visible.length === 0 && <p>No matching people. Try another name.</p>}
  </div>;
}
