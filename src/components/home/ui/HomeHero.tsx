import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Checkbox } from "@/components/ui/checkbox"
  
  import { Input } from "@/components/ui/input";
  import Image from "next/image";

function HomeHero() {
    return (
        <div className="h-[300px] bg-[#E7F0FE] rounded-md">
        <div className="flex flex-col items-center justify-center gap-10 h-full">
          <div className="w-[495px] text-xl font-semibold">
            <p>Hello Emmy, lets find top-rated doctors for you</p>
          </div>
          <div className="w-[911px] h-[64px] bg-white rounded-[300px] flex items-center justify-center p-3">
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
                  // value={""}
                  // onValueChange={}
                  className="flex flex-wrap justify-center gap-3 my-5"
                >
                  <DropdownMenuRadioItem
                    value="top"
                    className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                  >
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
                    value="top"
                    className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                  >
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
                    value="top"
                    className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                  >
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
                    value="top"
                    className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                  >
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
                    value="top"
                    className="w-[151px] border border-[#E5E7EB] rounded-md p-3 bg-white block"
                  >
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

            <DropdownMenu>
              <DropdownMenuTrigger className="text-left border-r px-3">
                <p className="font-[600] text-[12px]">Ratings</p>
                <p className="text-[#6B7280] font-[500] text-[14px]">
                  Choose ratings
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[347px]">
                <DropdownMenuLabel>Ratings</DropdownMenuLabel>
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

            <DropdownMenu>
              <DropdownMenuTrigger className="text-left border-r px-3">
                <p className="font-[600] text-[12px]">Price</p>
                <p className="text-[#6B7280] font-[500] text-[14px]">
                  Set your price
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[347px]">
                <DropdownMenuLabel>Price</DropdownMenuLabel>

                <div className="flex justify-center gap-3 my-3">
                  <Input placeholder="Min" className="w-[150px]" />
                  <Input placeholder="Max" className="w-[150px]" />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-left px-3">
                <p className="font-[600] text-[12px]">Language spoken</p>
                <p className="text-[#6B7280] font-[500] text-[14px]">
                  Add languages
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[250px] flex flex-col gap-3 p-3">
                <DropdownMenuLabel>Language spoken</DropdownMenuLabel>
                <div className="flex items-center space-x-2">
                <Checkbox/>
                <label htmlFor="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">English</label>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox/>
                <label htmlFor="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Igbo</label>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox/>
                <label htmlFor="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Hausa</label>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox/>
                <label htmlFor="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Yoruba</label>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox/>
                <label htmlFor="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Efik</label>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox/>
                <label htmlFor="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Pidgin</label>
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
              Our doctors are fully licensed by the Medical and Dental Council
              of Nigeria
            </p>
          </div>
        </div>
      </div>
    );
}

export default HomeHero;