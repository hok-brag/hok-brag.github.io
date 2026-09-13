import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact — Church Communion Database",
};

const partnerSites = [
  {
    href: "https://platelru.github.io/ppdb/",
    label: "Political Parties Database",
  },
  {
    href: "https://bananasareviolet.github.io/epgroupbuilder/",
    label: "EP Group Builder",
  },
  {
    href: "https://bananasareviolet.github.io/eestimate/",
    label: "EEstimate",
  },
];

export default function ContactPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <div className="page-body contact-page">
        <div className="breadcrumbs">
          <Link href="/">Index</Link> <span>›</span> <strong>Contact</strong>
        </div>

        <section className="panel contact-panel">
          <div className="section-label">Contact</div>
          <p className="contact-blurb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="contact-const"
              src="/branding/const.gif"
              alt=""
              aria-hidden="true"
            />
            <span>No public contact channel is set yet. Partner projects:</span>
          </p>
        </section>

        <section className="panel contact-panel">
          <div className="section-label">Partner sites</div>
          <div className="partner-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="partner-point"
              src="/branding/moses_pointing.gif"
              alt=""
              aria-hidden="true"
            />
            <div className="contact-links">
              {partnerSites.map((site) => (
                <a href={site.href} target="_blank" rel="noreferrer" key={site.href}>
                  {site.label}
                </a>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="partner-point"
              src="/branding/pointing.gif"
              alt=""
              aria-hidden="true"
            />
          </div>
        </section>

        <div className="contact-write" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/branding/writepg.gif" alt="" />
        </div>
      </div>
      <footer>
        <Link href="/">← Return to index page</Link>
        <span>Church Communion Database — Contact</span>
      </footer>
    </main>
  );
}
