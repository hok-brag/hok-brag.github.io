import type { Metadata } from "next";
import "./globals.css";

// Root-Deployment auf hok-brag.github.io (kein /ppdb-Unterpfad)
const assetPrefix = "";

export const metadata: Metadata = {
  title: "Church Communion Database",
  description: "Open-source database of church unions worldwide.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${assetPrefix}/branding/PPDB.png`,
    shortcut: `${assetPrefix}/branding/PPDB.png`,
    apple: `${assetPrefix}/branding/PPDB.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
