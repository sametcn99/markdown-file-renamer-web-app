// Import necessary modules and styles
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer";

// Load the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the web app
export const metadata: Metadata = {
  title: "Markdown File Renamer Web App",
  description:
    "This project is a web application that allows users to upload Markdown files, store them locally, and later download the files with renamed filenames. It has been created to help develop the NextUI Blog Template project.",
  creator: "https://github.com/sametcn99",
  keywords:
    "nextjs, typescript, tailwindcss, markdown, md, mdx, renamer, web app, file renamer, file renamer web app, markdown file renamer",
};

// Root layout component for the entire app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col justify-center items-center min-h-screen`}
      >
        {/* Main content container with flex layout */}
        <main className="md:w-[40rem] sm:w-[30rem] flex flex-col gap-2 break-all transition-all duration-1000">
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
