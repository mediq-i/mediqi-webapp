"use client";

import HomeHero from "@/components/home/ui/HomeHero";
import VitalsCTA from "@/components/home/VitalsCTA";

// import { Metadata } from "next";
// import SEOWrapper from "@/utils/seo-wrapper";

// export const metadata: Metadata = {
//   title: "Home / MEDIQ-i",
//   description: "MEDQI-i",
// };

export default function Home() {
  return (
    <div className="p-6 space-y-8">
      <HomeHero />
      <VitalsCTA />
    </div>
  );
}
