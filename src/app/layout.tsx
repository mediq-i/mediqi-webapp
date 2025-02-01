"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers";
import Sidebar from "@/components/partials/ui/SideBar";
import Navbar from "@/components/partials/ui/NavBar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const requireLayout = (pathname: string): boolean => {
  const authPaths = [
    "/auth/login",
    "/auth/signup",
    "/auth",
    "/auth/email-confirmation",
  ];
  return !authPaths.includes(pathname);
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showLayout = requireLayout(pathname);
  if (!showLayout) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">
          {" "}
          <Sidebar />{" "}
          <div className="flex-1 flex flex-col ml-64">
            {" "}
            <Navbar />
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>{" "}
        </div>
      </body>
    </html>
  );
}
