import Image from "next/image";
import React from "react";

const specialties = [
  {
    id: 1,
    name: "General",
    img: "/dark-man.png",
    description: "General practitioner",
    bg: "bg-[#DDEAFD]",
  },
  {
    id: 1,
    name: "General",
    img: "/dark-man.png",
    description: "General practitioner",
    bg: "bg-[#FCCFE8]",
  },
  {
    id: 1,
    name: "Dentist",
    img: "/dark-man.png",
    description: "Get expert care for your teeth",
    bg: "bg-[#FDE6D5]",
  },
  {
    id: 1,
    name: "General",
    img: "/dark-man.png",
    description: "General practitioner",
    bg: "bg-[#FCCFCF]",
  },
  {
    id: 1,
    name: "General",
    img: "/dark-man.png",
    description: "General practitioner",
    bg: "bg-[#D3F8DF]",
  },
  {
    id: 1,
    name: "General",
    img: "/dark-man.png",
    description: "General practitioner",
    bg: "bg-[#7A5AF81A]",
  },
  {
    id: 1,
    name: "General",
    img: "/dark-man.png",
    description: "General practitioner",
    bg: "bg-[#7A5AF81A]",
  },
  {
    id: 1,
    name: "General",
    img: "/dark-man.png",
    description: "General practitioner",
    bg: "bg-[#7A5AF81A]",
  },
];

function Specialties() {
  return (
    <div className="py-5">
      <div className="flex justify-between">
        <p className="font-[600] text-[18px] text-[#1D2939]">Specialties</p>
        <a href="" className="text-[#1570EF] text-[14px] font-[500]">
          See more specialties
        </a>
      </div>

      <div className="py-3 flex flex-wrap gap-3">
        {specialties.map((specialty, index) => {
          return (
            <div
              key={index}
              className={`w-[265px] border border-[#E5E7EB] rounded-md p-3 ${specialty.bg}`}
            >
              <Image
                src={specialty.img}
                alt="man"
                width={42}
                height={42}
                className="block mb-5"
              />
              <p>{specialty.name}</p>
              <p className="text-[#666666] text-[16px] font-[400]">
                {specialty.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Specialties;
