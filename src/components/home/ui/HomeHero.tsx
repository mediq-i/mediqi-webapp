"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";

const specialties = ["General", "Cardiologist", "Dermatologist", "Dentist"];
const ratings = ["Any", "5.0", "4.0", "3.0", "2.0", "1.0"];
const languages = ["English", "Igbo", "Yoruba", "Hausa"];

function HomeHero() {
  const [open, setOpen] = useState<boolean>(false);
  const [languageOpen, setLanguageOpen] = useState<boolean>(false);

  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const { data } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const handleClose = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setOpen(false);
  };
  return (
    <div className="h-[300px] bg-[#E7F0FE] rounded-md relative">
      <div className="flex flex-col items-center justify-center gap-10 h-full">
        <div className="text-xl w-[90%] mx-auto font-semibold">
          <p className="text-center">
            Hello {data?.user.first_name}, lets find top-rated doctors for you
          </p>
        </div>
        <div className=" bg-white rounded-[300px] flex items-center justify-center px-8  py-3.5 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-left border-r pr-4">
              <p className="font-[600] text-[12px]">Specialty</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                {selectedSpecialty ?? "What type of doctor"}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[347px]">
              <DropdownMenuLabel>Specialty</DropdownMenuLabel>
              <Input
                placeholder="Search specialty, symptoms"
                type="search"
                className="mt-3"
              />
              <DropdownMenuRadioGroup
                value={selectedSpecialty ?? ""}
                onValueChange={(value) => setSelectedSpecialty(value)}
                className="flex flex-wrap p-1 gap-3 my-5"
              >
                {specialties.map((specialty) => (
                  <DropdownMenuRadioItem
                    key={specialty}
                    value={specialty}
                    className="w-[151px] border border-[#E5E7EB] rounded-md p-3"
                  >
                    <div className="flex justify-end">
                      <input
                        type="radio"
                        checked={selectedSpecialty === specialty}
                        readOnly
                        className="form-radio text-blue-500 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <Image
                      src={"/dark-man.png"}
                      alt="doctor"
                      width={42}
                      height={42}
                    />
                    <p>{specialty}</p>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="text-left border-r pr-4">
              <p className="font-[600] text-[12px]">Ratings</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                {selectedRating ?? "Choose ratings"}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[347px] p-3">
              <div className="flex justify-between px-2">
                <DropdownMenuLabel>Ratings</DropdownMenuLabel>
                <div className="flex justify-center rounded-full bg-[#F2F4F7] w-[30px]">
                  {" "}
                  <button
                    onClick={() => handleClose(setOpen)}
                    className="text-black hover:text-red-700"
                  >
                    {" "}
                    &#10005;{" "}
                  </button>{" "}
                </div>
              </div>
              <DropdownMenuRadioGroup
                value={selectedRating ?? ""}
                onValueChange={(value) => setSelectedRating(value)}
                className="flex flex-wrap p-2 gap-3 my-5"
              >
                {ratings.map((rating) => (
                  <DropdownMenuRadioItem
                    key={rating}
                    value={rating}
                    className="rounded-3xl px-5 py-3 bg-[#F2F4F7] hover:bg-black hover:text-white"
                  >
                    {rating}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <DropdownMenu open={priceOpen} onOpenChange={setPriceOpen}>
            <DropdownMenuTrigger className="text-left border-r pr-4">
              <p className="font-[600] text-[12px]">Price</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                {priceRange[0] !== 0 || priceRange[1] !== 100
                  ? `N${priceRange[0]} - N${priceRange[1]}`
                  : "Set your price"}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[347px] p-3">
              <div className="flex justify-between">
                <DropdownMenuLabel>Price</DropdownMenuLabel>
                <div className="flex justify-center rounded-full bg-[#F2F4F7] w-[30px]">
                  {" "}
                  <button
                    onClick={() => handleClose(setPriceOpen)}
                    className="text-black hover:text-red-700"
                  >
                    {" "}
                    &#10005;{" "}
                  </button>{" "}
                </div>
              </div>
              <div className="flex justify-center gap-3 my-5">
                <Input placeholder="Min" className="w-[150px]" />
                <Input placeholder="Max" className="w-[150px]" />
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-[#1D2939] font-[600] text-[12px]">N0</p>
                  <p className="text-[#1D2939] font-[600] text-[12px]">N1m</p>
                </div>
                <Slider
                  defaultValue={[35]}
                  max={100}
                  step={1}
                  className="my-3"
                />
              </div>
            </DropdownMenuContent>

          
          </DropdownMenu> */}

          <DropdownMenu open={languageOpen} onOpenChange={setLanguageOpen}>
            <DropdownMenuTrigger className="text-left pr-">
              <p className="font-[600] text-[12px]">Language spoken</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                {selectedLanguages.length
                  ? selectedLanguages.join(", ")
                  : "Add languages"}
              </p>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent className="w-[250px] flex flex-col gap-6 p-3">
              <div className="flex justify-between">
                <DropdownMenuLabel>Language Spoken</DropdownMenuLabel>
                <div className="flex justify-center rounded-full bg-[#F2F4F7] w-[30px]">
                  {" "}
                  <button
                    onClick={() => handleClose(setLanguageOpen)}
                    className="text-black hover:text-red-700"
                  >
                    {" "}
                    &#10005;{" "}
                  </button>{" "}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor=""
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  English
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor=""
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Igbo
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor=""
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hausa
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor=""
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Yoruba
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor=""
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Efik
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor=""
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pidgin
                </label>
              </div>
            </DropdownMenuContent> */}

            <DropdownMenuContent className="w-[250px] p-3">
              <DropdownMenuLabel>Language Spoken</DropdownMenuLabel>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedLanguages.includes(lang)}
                      onCheckedChange={() => toggleLanguage(lang)}
                    />
                    <label className="text-sm font-medium">{lang}</label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="bg-[#1570EF] hover:bg-[#1570EF]/90 transition-all duration-100 rounded-full text-sm py-[14px] px-6 text-white font-semibold">
            Find Now
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Image src={"/badge.svg"} alt="" height={24} width={24} />
          <p className="text-[#333333] text-[14px] font-[400]">
            Our doctors are fully licensed by the Medical and Dental Council of
            Nigeria
          </p>
        </div>
      </div>
      <Image src={"/hero-bg.png"} alt="" height={125} width={125} className="absolute top-0 left-0"/>
      <Image src={"/hero-bg-2.png"} alt="" height={125} width={125} className="absolute top-5 right-[0]"/>
      <Image src={"/hero-bg-3.png"} alt="" height={125} width={125} className="absolute bottom-5 left-[230px]"/>


    </div>
  );
}

export default HomeHero;
