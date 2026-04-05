import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { GoogleOAuthProvider } from "@/providers/GoogleOAuthProvider";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "700", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Renma - Ember OS",
  description:
    "Gamify existence. Track stats. Level up. The operating system for the human experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} bg-obsidian text-gray-300 font-tech antialiased overflow-x-hidden selection:bg-ember selection:text-white`}
      >
        <QueryProvider>
          <GoogleOAuthProvider>{children}</GoogleOAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
