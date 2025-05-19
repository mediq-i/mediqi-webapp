import Image from "next/image";
import React from "react";

const specialties = [
  {
    id: 1,
    name: "General Physician",
    img: "/dark-man.png",
    description: "Provides primary healthcare and treats common illnesses.",
    bg: "bg-[#DDEAFD]",
  },
  {
    id: 2,
    name: "Cardiologist",
    img: "/dark-man.png",
    description: "Specializes in heart diseases and cardiovascular conditions.",
    bg: "bg-[#FCCFE8]",
  },
  {
    id: 3,
    name: "Dermatologist",
    img: "/dark-man.png",
    description: "Focuses on skin, hair, and nail disorders.",
    bg: "bg-[#FDE6D5]",
  },
  {
    id: 4,
    name: "Pediatrician",
    img: "/dark-man.png",
    description:
      "Provides medical care for infants, children, and adolescents.",
    bg: "bg-[#FCCFCF]",
  },
  {
    id: 5,
    name: "Orthopedic Surgeon",
    img: "/dark-man.png",
    description: "Treats bone, joint, and musculoskeletal disorders.",
    bg: "bg-[#D3F8DF]",
  },
  {
    id: 6,
    name: "Neurologist",
    img: "/dark-man.png",
    description: "Diagnoses and treats brain and nervous system disorders.",
    bg: "bg-[#7A5AF81A]",
  },
  {
    id: 7,
    name: "Oncologist",
    img: "/dark-man.png",
    description: "Specializes in diagnosing and treating cancer.",
    bg: "bg-[#7A5AF81A]",
  },
  {
    id: 8,
    name: "Psychiatrist",
    img: "/dark-man.png",
    description:
      "Focuses on mental health, including depression and anxiety disorders.",
    bg: "bg-[#7A5AF81A]",
  },
];

function Specialties() {
  return (
    <div className="py-5">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <p className="font-[600] text-[18px] text-[#1D2939]">Specialties</p>
        <a href="" className="text-[#1570EF] text-[14px] font-[500]">
          See more specialties
        </a>
      </div>

      <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {specialties.map((specialty, index) => {
          return (
            <div
              key={index}
              className={`border border-[#E5E7EB] rounded-md p-3 ${specialty.bg}`}
            >
              <Image
                src={specialty.img}
                alt="man"
                width={42}
                height={42}
                className="block mb-5"
              />
              <p className="text-[16px] md:text-[18px] font-medium">
                {specialty.name}
              </p>
              <p className="text-[#666666] text-[14px] md:text-[16px] font-[400]">
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
