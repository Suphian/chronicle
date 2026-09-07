"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { characterPortraits } from "@/content/portraits";
import type { CharacterImportance, PersonListing } from "@/content/people";

export function PeopleDirectory({ people }: { people: PersonListing[] }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<CharacterImportance, boolean>>({ major: true, minor: false });
  const visible = people.filter((person) => `${person.name} ${person.group} ${person.status}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <div className="people-directory"><label htmlFor="people-search">Find a person across all groups</label><input id="people-search" type="search" value={query} onChange={(event) => {
    const value = event.target.value;
    setQuery(value);
    setExpanded({ major: true, minor: Boolean(value.trim()) });
  }} placeholder="Name, connection, imported or proposed…" />
    <p className="directory-count" aria-live="polite">{visible.length} {visible.length === 1 ? "person" : "people"}{query.trim() ? " matching your search" : " in the directory"}</p>
    {(["major", "minor"] as const).map((importance) => {
      const members = visible.filter((person) => person.importance === importance);
      if (!members.length) return null;
      return <section className={`people-group people-group-${importance}`} key={importance}>
        <h2><button className="people-group-toggle" type="button" aria-expanded={expanded[importance]} aria-controls={`people-${importance}`} onClick={() => setExpanded((current) => ({ ...current, [importance]: !current[importance] }))}>
          <span>{importance === "major" ? "Major characters" : "Minor characters"} <small>({members.length})</small></span><span aria-hidden="true">{expanded[importance] ? "−" : "+"}</span>
        </button></h2>
        <div id={`people-${importance}`} hidden={!expanded[importance]}>
          {importance === "minor" && <p className="section-footnote">Supporting cast, people from the imported map, and characters still under consideration.</p>}
          <div className="notebook-cards people-cards">{members.map((person) => <Link id={person.id} key={person.id} href={`/library/characters/${person.id}`}>
            {importance === "major" && characterPortraits[person.id] && <div className="people-portrait"><Image src={characterPortraits[person.id].src} alt="" fill sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 280px" className="object-cover" /></div>}
            <div className="people-card-copy"><span>{person.group}</span><h3>{person.name}</h3><p className="people-status">{person.status}</p></div>
          </Link>)}</div>
        </div>
      </section>;
    })}
    {visible.length === 0 && <p>No matching people. Try another name.</p>}
  </div>;
}
