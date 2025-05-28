"use client";
import React, { useState } from "react";

import Image from "next/image";
import { queryKeys } from "@/constants";
import EnhancedDropdown from "./EnhancedDropdown";
import { useUserQuery, UserAdapter } from "@/adapters/UserAdapter";
import {
  BabyIcon,
  HeartPulseIcon,
  StethoscopeIcon,
  UtensilsIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const specialties = [
  {
    name: "General Practitioner",
    slug: "general-medicine",
    icon: <StethoscopeIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Gynecologist",
    slug: "gynecology",
    icon: <StethoscopeIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Pediatrician",
    slug: "pediatrics",
    icon: <BabyIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Cardiologist",
    slug: "cardiology",
    icon: <HeartPulseIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Dietician",
    slug: "dietetics",
    icon: <UtensilsIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Dermatologist",
    slug: "dermatology",
    icon: <StethoscopeIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Dentist",
    slug: "dentistry",
    icon: <StethoscopeIcon className="w-6 h-6 text-blue-500" />,
  },
];

// const ratings = ["5.0", "4.5+", "4.0+", "3.5+", "3.0+"];
const languages = ["English", "Igbo", "Yoruba", "Hausa"];

export default function HomeHero() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  // const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleSpecialtyChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSelectedSpecialty(value);
    }
  };

  // const handleRatingChange = (value: string | string[]) => {
  //   if (typeof value === "string") {
  //     setSelectedRating(value);
  //   }
  // };

  const handleLanguageChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setSelectedLanguages(value);
    }
  };

  const { data } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });

  return (
    <div className="min-h-[300px] bg-[#E7F0FE] rounded-md relative px-4 py-6 md:px-8 md:pt-8">
      <div className="flex flex-col items-center justify-center gap-6 md:gap-10 h-full">
        <div className="text-lg md:text-xl w-full md:w-[90%] mx-auto font-semibold">
          <p className="text-center">
            Hello {data?.user.first_name}, lets find top-rated doctors for you
          </p>
        </div>

        {/* Search Container */}
        <div className="w-full bg-white rounded-[30px] flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-3.5 gap-4 md:w-max">
          <EnhancedDropdown
            type="specialty"
            label="Specialty"
            placeholder="What type of doctor"
            value={selectedSpecialty || ""}
            options={specialties}
            onChange={handleSpecialtyChange}
          />

          {/* <EnhancedDropdown
            type="rating"
            label="Ratings"
            placeholder="Choose ratings"
            value={selectedRating || ""}
            options={ratings}
            onChange={handleRatingChange}
            disabled={!selectedSpecialty}
          /> */}

          <EnhancedDropdown
            type="language"
            label="Language spoken"
            placeholder="Add languages"
            value={selectedLanguages}
            options={languages}
            onChange={handleLanguageChange}
          />

          <Button
            onClick={() =>
              router.push(
                `/service-providers?specialty=${
                  selectedSpecialty || ""
                }&languages=${selectedLanguages.join(",")}`
              )
            }
            className="w-full md:w-auto bg-blue-600 text-white rounded-lg py-4 hover:bg-blue-700 transition-colors"
            disabled={!selectedSpecialty || !selectedLanguages.length}
          >
            Search
          </Button>
        </div>

        {/* Badge Section */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
          <Image src={"/badge.svg"} alt="" height={24} width={24} />
          <p className="text-[#333333] text-[14px] font-[400]">
            Our doctors are fully licensed by the Medical and Dental Council of
            Nigeria
          </p>
        </div>
      </div>

      {/* Background Images - Hide on mobile */}
      <div className="hidden md:block">
        <Image
          src={"/hero-bg.png"}
          alt=""
          height={125}
          width={125}
          className="absolute top-0 left-0"
        />
        <Image
          src={"/hero-bg-2.png"}
          alt=""
          height={125}
          width={125}
          className="absolute top-5 right-[0]"
        />
        <Image
          src={"/hero-bg-3.png"}
          alt=""
          height={125}
          width={125}
          className="absolute bottom-5 left-[230px]"
        />
      </div>
    </div>
  );
}
