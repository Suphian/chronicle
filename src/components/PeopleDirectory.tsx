"use client";

import Link from "next/link";
import { useState } from "react";

export function PeopleDirectory({ people }: { people: { id: string; name: string; group: string }[] }) {
  const [query, setQuery] = useState("");
  const visible = people.filter((person) => `${person.name} ${person.group}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  return <div className="people-directory"><label htmlFor="people-search">Find a person</label><input id="people-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name or connection…" />
    <p className="directory-count" aria-live="polite">{visible.length} {visible.length === 1 ? "person" : "people"}</p>
    <div className="notebook-cards">{visible.map((person) => <Link id={person.id} key={person.id} href={`/library/characters/${person.id}`}><span>{person.group}</span><h2>{person.name}</h2><p>History · motivations · relationships →</p></Link>)}</div>
    {visible.length === 0 && <p>No people match that search. Try a first name or “family”.</p>}
  </div>;
}
