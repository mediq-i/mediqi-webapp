"use client";

import HomeHero from "@/components/home/ui/HomeHero";
import Specialties from "@/components/home/ui/Specialties";
import TopDoctors from "@/components/home/ui/TopDoctors";

// import { Metadata } from "next";
// import SEOWrapper from "@/utils/seo-wrapper";

// export const metadata: Metadata = {
//   title: "Home / MEDIQ-i",
//   description: "MEDQI-i",
// };

export default function Home() {
  return (
    <div className="p-6">
      <HomeHero />
      <Specialties />
      <TopDoctors />
    </div>
  );
}
