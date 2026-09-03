import Link from "next/link";
import { ThemeButton } from "./ThemeButton";

export function SiteHeader() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      <header className="site-header">
        <div className="site-identity">
          <Link className="brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${basePath}/branding/fish3.gif`} alt="CCDB logo" />
            <span>Church Communion Database</span>
          </Link>
          <p>Open-source database of church unions worldwide.</p>
        </div>
        <div className="site-header-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="header-dove"
            src={`${basePath}/branding/dove5.gif`}
            alt=""
            aria-hidden="true"
          />
          <ThemeButton />
        </div>
      </header>
      <nav className="main-nav" aria-label="Primary navigation">
        <Link href="/">Index</Link>
        <Link href="/#about">About</Link>
        <Link href="/data-guide">Data guide</Link>
        <a
          href="https://github.com/hok-brag/hok-brag.github.io/blob/main/data/PPDB%20database.xlsx"
          target="_blank"
          rel="noreferrer"
        >
          Party spreadsheet
        </a>
      </nav>
    </>
  );
}
