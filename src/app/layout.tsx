import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
  title: "AlgVis",
  description: "Algorithm Visualizer website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
