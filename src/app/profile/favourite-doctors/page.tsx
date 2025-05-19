"use client";

import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="p-6">
      <p className="text-lg font-bold">My Favourite Doctors</p>
      <div className="flex gap-3 mt-3">
        <div className={` border border-[#E5E7EB] rounded-md p-3  w-[350px]`}>
          <Image
            src={"/doctor-passport.png"}
            alt="man"
            width={350}
            height={300}
            className="block mb-5 m-auto"
          />
          <p className="text-[#0C1523] text-[16px] font-[500]">
            {"Dr. Emily Harper, MD"}
          </p>
          <p className="text-[#667085] text-[14px] font-[400]">
            {"Cardiologist"}
          </p>
          <div className="flex items-center gap-3 justify-between">
            <p className="text-[14px] font-[400] flex items-center gap-1">
              {"4.8"}
              <Image
                src={"/star.svg"}
                alt="star"
                width={15}
                height={15}
                className="inline"
              />
              <span className="text-[#667085]">(12k Reviews)</span>
            </p>
            <p className="font-black">NGN 1,500</p>
          </div>
        </div>
        <div className={` border border-[#E5E7EB] rounded-md p-3  w-[350px]`}>
          <Image
            src={"/doctor-passport.png"}
            alt="man"
            width={350}
            height={300}
            className="block mb-5 m-auto"
          />
          <p className="text-[#0C1523] text-[16px] font-[500]">
            {"Dr. Emily Harper, MD"}
          </p>
          <p className="text-[#667085] text-[14px] font-[400]">
            {"Cardiologist"}
          </p>
          <div className="flex items-center gap-3 justify-between">
            <p className="text-[14px] font-[400] flex items-center gap-1">
              {"4.8"}
              <Image
                src={"/star.svg"}
                alt="star"
                width={15}
                height={15}
                className="inline"
              />
              <span className="text-[#667085]">(12k Reviews)</span>
            </p>
            <p className="font-black">NGN 40000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
