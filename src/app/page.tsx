import HomeHero from "@/components/home/ui/HomeHero";
import Specialties from "@/components/home/ui/Specialties";
import TopDoctors from "@/components/home/ui/TopDoctors";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <div className="p-6">
      <HomeHero/>
      <Specialties/>
      <TopDoctors/>
    </div>
  );
}
