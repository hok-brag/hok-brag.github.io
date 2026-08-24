import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { getParty, type RichTextRun } from "../../lib/parties";
import { partyLinkLabel } from "../../lib/wiki-links";

const PPDB_BASE = "https://platelru.github.io/ppdb";
/** Neutrale Farbe für externe PPDB-Links */
const PPDB_SWATCH = "#1e3a5f";

function InlineWikiText({ text }: { text: string }) {
  const pattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const parts: ReactNode[] = [];
  let cursor = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    const [, rawId, label] = match;
    const id = rawId.trim();
    const key = `${id}-${match.index}`;

    const ppdbMatch = /^(?:ppdb|platel):(.+)$/i.exec(id);
    if (ppdbMatch) {
      const externalId = ppdbMatch[1].trim();
      const displayLabel = label?.trim() || externalId;
      const href = `${PPDB_BASE}/party/${encodeURIComponent(externalId)}/`;
      parts.push(
        <span className="party-inline-link" key={key}>
          <span
            className="party-link-swatch"
            style={{ "--party-link-color": PPDB_SWATCH } as CSSProperties}
            aria-hidden="true"
          />
          <a href={href} target="_blank" rel="noreferrer">
            {displayLabel}
          </a>
        </span>,
      );
      cursor = pattern.lastIndex;
      continue;
    }

    const linkedParty = getParty(id);
    const displayLabel = partyLinkLabel(linkedParty, id, label);
    parts.push(
      linkedParty ? (
        <span className="party-inline-link" key={key}>
          <span
            className="party-link-swatch"
            style={{ "--party-link-color": linkedParty.color } as CSSProperties}
            aria-hidden="true"
          />
          <Link href={`/party/${linkedParty.id}`}>{displayLabel}</Link>
        </span>
      ) : (
        <Link
          className="missing-party-link"
          href={`/party/${encodeURIComponent(id)}`}
          key={key}
          title={`No record for ${id}`}
        >
          {displayLabel}
        </Link>
      ),
    );
    cursor = pattern.lastIndex;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));

  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

function StyledRun({ run }: { run: RichTextRun }) {
  let content: ReactNode = <InlineWikiText text={run.text} />;
  if (run.italic) content = <em>{content}</em>;
  if (run.bold) content = <strong>{content}</strong>;
  return content;
}

function paragraphRuns(runs: RichTextRun[]) {
  const paragraphs: RichTextRun[][] = [[]];
  for (const run of runs) {
    const parts = run.text.split(/(\n\s*\n)/);
    for (const part of parts) {
      if (!part) continue;
      if (/^\n\s*\n$/.test(part)) {
        if (paragraphs.at(-1)?.length) paragraphs.push([]);
      } else {
        paragraphs.at(-1)?.push({ ...run, text: part });
      }
    }
  }
  return paragraphs.filter((paragraph) => paragraph.length);
}

export function RichText({
  text,
  runs,
  paragraphs = false,
}: {
  text: string;
  runs?: RichTextRun[];
  paragraphs?: boolean;
}) {
  const contentRuns = runs?.length
    ? runs
    : [{ text, bold: false, italic: false }];

  if (!paragraphs) {
    return contentRuns.map((run, index) => <StyledRun key={index} run={run} />);
  }

  return paragraphRuns(contentRuns).map((paragraph, paragraphIndex) => (
    <p key={paragraphIndex}>
      {paragraph.map((run, runIndex) => (
        <StyledRun key={runIndex} run={run} />
      ))}
    </p>
  ));
}

export function WikiText({ text, runs }: { text: string; runs?: RichTextRun[] }) {
  return <RichText text={text} runs={runs} paragraphs />;
}
