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
import { Slider } from "@/components/ui/slider";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";

function HomeHero() {
  const [selected, setSelected] = useState("option1");
  const [open, setOpen] = useState<boolean>(false);
  const [priceOpen, setPriceOpen] = useState<boolean>(false);
  const [languageOpen, setLanguageOpen] = useState<boolean>(false);

  const { data } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });

  const handleClose = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setOpen(false);
  };
  return (
    <div className="h-[300px] bg-[#E7F0FE] rounded-md">
      <div className="flex flex-col items-center justify-center gap-10 h-full">
        <div className="w-[495px] text-xl font-semibold">
          <p>
            Hello {data?.user.first_name}, lets find top-rated doctors for you
          </p>
        </div>
        <div className="w-[911px] h-[64px] bg-white rounded-[300px] flex items-center justify-center p-3 gap-10">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-left border-r px-3">
              <p className="font-[600] text-[12px]">Specialty</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                What type of doctors?
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
                value={selected}
                onValueChange={(value) => setSelected(value)}
                className="flex flex-wrap p-1 gap-3 my-5"
              >
                <DropdownMenuRadioItem
                  value="1"
                  className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      checked={selected === "1"}
                      readOnly
                      className="form-radio text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <Image
                    src={"/dark-man.png"}
                    alt="man"
                    width={42}
                    height={42}
                    className="block"
                  />
                  <p>General</p>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="2"
                  className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      checked={selected === "2"}
                      readOnly
                      className="form-radio text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <Image
                    src={"/dark-man.png"}
                    alt="man"
                    width={42}
                    height={42}
                    className="block"
                  />
                  <p>General</p>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="3"
                  className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      checked={selected === "3"}
                      readOnly
                      className="form-radio text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <Image
                    src={"/dark-man.png"}
                    alt="man"
                    width={42}
                    height={42}
                    className="block"
                  />
                  <p>General</p>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="4"
                  className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      checked={selected === "4"}
                      readOnly
                      className="form-radio text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <Image
                    src={"/dark-man.png"}
                    alt="man"
                    width={42}
                    height={42}
                    className="block"
                  />
                  <p>General</p>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="5"
                  className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      checked={selected === "5"}
                      readOnly
                      className="form-radio text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <Image
                    src={"/dark-man.png"}
                    alt="man"
                    width={42}
                    height={42}
                    className="block"
                  />
                  <p>General</p>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="text-left border-r px-3">
              <p className="font-[600] text-[12px]">Ratings</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                Choose ratings
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
                // value={""}
                // onValueChange={}
                className="flex flex-wrap p-2 gap-3 my-5"
              >
                <DropdownMenuRadioItem
                  value="Any"
                  className=" rounded-3xl px-5 py-3 bg-[#F2F4F7] block hover:text-white hover:bg-black"
                >
                  <p>Any</p>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="5.0"
                  className=" rounded-3xl px-5 py-3 bg-[#F2F4F7] block hover:text-white hover:bg-black"
                >
                  <p>5.0</p>
                </DropdownMenuRadioItem>{" "}
                <DropdownMenuRadioItem
                  value="4.0"
                  className=" rounded-3xl px-5 py-3 bg-[#F2F4F7] block hover:text-white hover:bg-black"
                >
                  <p>4.0</p>
                </DropdownMenuRadioItem>{" "}
                <DropdownMenuRadioItem
                  value="3.0"
                  className=" rounded-3xl px-5 py-3 bg-[#F2F4F7] block hover:text-white hover:bg-black"
                >
                  <p>3.0</p>
                </DropdownMenuRadioItem>{" "}
                <DropdownMenuRadioItem
                  value="2.0"
                  className=" rounded-3xl px-5 py-3 bg-[#F2F4F7] block hover:text-white hover:bg-black"
                >
                  <p>2.0</p>
                </DropdownMenuRadioItem>{" "}
                <DropdownMenuRadioItem
                  value="1.0"
                  className=" rounded-3xl px-5 py-3 bg-[#F2F4F7] block hover:text-white hover:bg-black"
                >
                  <p>1.0</p>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={priceOpen} onOpenChange={setPriceOpen}>
            <DropdownMenuTrigger className="text-left border-r px-3">
              <p className="font-[600] text-[12px]">Price</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                Set your price
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
          </DropdownMenu>

          <DropdownMenu open={languageOpen} onOpenChange={setLanguageOpen}>
            <DropdownMenuTrigger className="text-left px-3">
              <p className="font-[600] text-[12px]">Language spoken</p>
              <p className="text-[#6B7280] font-[500] text-[14px]">
                Add languages
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px] flex flex-col gap-6 p-3">
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
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="bg-[#1570EF] rounded-3xl mx-3 p-2 h-[48px] text-white font-semibold">
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
    </div>
  );
}

export default HomeHero;
