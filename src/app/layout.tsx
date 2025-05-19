"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers";
import Sidebar from "@/components/partials/ui/SideBar";
import Navbar from "@/components/partials/ui/NavBar";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/providers/user-provider";
// import AgoraWrapper from "@/providers/agora-wrapper";
import { useState } from "react";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/contexts/AuthContext";

const AgoraWrapper = dynamic(() => import("@/providers/agora-wrapper"), {
  ssr: false,
});

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
    "/auth/reset-password",
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!showLayout) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <UserProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </UserProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <UserProvider>
            <AgoraWrapper>
              <ReactQueryProvider>
                <div className="flex h-screen">
                  {/* Mobile Sidebar Overlay */}
                  {sidebarOpen && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                      onClick={() => setSidebarOpen(false)}
                    />
                  )}

                  {/* Sidebar */}
                  <div
                    className={`
                  fixed md:static z-50 transform transition-transform duration-300 ease-in-out
                  ${
                    sidebarOpen
                      ? "translate-x-0"
                      : "-translate-x-full md:translate-x-0"
                  }
                `}
                  >
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col md:ml-[0px] w-full">
                    <div className="flex items-center justify-between p-4 md:hidden">
                      <button onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                      </button>
                      <div className="font-bold">MEDIQ-i</div>
                    </div>
                    <Navbar />
                    <Toaster />
                    <main className="flex-1 overflow-y-auto">{children}</main>
                  </div>
                </div>
              </ReactQueryProvider>
            </AgoraWrapper>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
