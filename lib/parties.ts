import database from "../data/parties.json";

export type FormerLogo = {
  url: string;
  until: string | null;
};

export type Party = Omit<
  (typeof database.parties)[number],
  "formerLogos" | "types" | "memberships"
> & {
  formerLogos: FormerLogo[];
  types: string[];
  memberships: string | null;
};

export type RichTextRun = {
  text: string;
  bold: boolean;
  italic: boolean;
};

export const parties = database.parties as Party[];

export const countries = Array.from(
  new Set(parties.map((party) => party.country).filter(Boolean)),
).sort((a, b) => a.localeCompare(b, "en"));

export function getParty(id: string) {
  return parties.find((party) => party.id.toLowerCase() === id.toLowerCase());
}

const WIKI_LINK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/** IDs aus Wiki-Links in einem Prosa-Feld (Relations, Memberships, …) */
export function extractRelationIds(text: string | null | undefined): string[] {
  if (!text) return [];
  const ids: string[] = [];
  const seen = new Set<string>();
  let match;
  const re = new RegExp(WIKI_LINK.source, "g");
  while ((match = re.exec(text)) !== null) {
    const id = match[1].trim();
    const key = id.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      ids.push(id);
    }
  }
  return ids;
}

/** Einträge, die diese ID in MEMBERSHIPS führen (= Mitglieder) */
export function getMemberParties(targetId: string) {
  const key = targetId.toLowerCase();
  return parties
    .filter((party) => {
      if (party.id.toLowerCase() === key) return false;
      return extractRelationIds(party.memberships).some(
        (id) => id.toLowerCase() === key,
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
}

export function formatDate(value: string | null) {
  if (!value) return null;
  if (/^\d{4}$/.test(value)) return value;

  const isMonthOnly = /^\d{4}-\d{2}$/.test(value);
  const normalized = isMonthOnly ? `${value}-01` : value;
  const date = new Date(`${normalized}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    ...(isMonthOnly ? {} : { day: "numeric" as const }),
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function dateSortKey(value: string | null) {
  if (!value) return "";
  if (/^\d{4}$/.test(value)) return `${value}-01-01`;
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
  return value;
}

export function formatLifeSpan(established: string | null, dissolved: string | null) {
  const startYear = established?.match(/^\d{4}/)?.[0] ?? null;
  const endYear = dissolved?.match(/^\d{4}/)?.[0] ?? null;
  if (!startYear || !endYear) return null;
  return `${startYear} – ${endYear}`;
}
