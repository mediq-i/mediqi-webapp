import Image from "next/image";
import Link from "next/link";
import React from "react";

const doctors = [
  {
    id: 1,
    name: "Dr. Emily Harper, MD",
    img: "/doctor-profile-pic.png",
    description: "Cardiologist",
    bg: "bg-[#DDEAFD]",
  },
  {
    id: 1,
    name: "Dr. Emily Harper, MD",
    img: "/doctor-profile-pic.png",
    description: "Cardiologist",
    bg: "bg-[#DDEAFD]",
  },
  {
    id: 1,
    name: "Dr. Emily Harper, MD",
    img: "/doctor-profile-pic.png",
    description: "Cardiologist",
    bg: "bg-[#DDEAFD]",
  },
  {
    id: 1,
    name: "Dr. Emily Harper, MD",
    img: "/doctor-profile-pic.png",
    description: "Cardiologist",
    bg: "bg-[#DDEAFD]",
  },
];

function TopDoctors() {
  return (
    <div className="py-5">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <p className="font-[600] text-[18px] text-[#1D2939]">
          Top rated doctors
        </p>
        <a href="" className="text-[#1570EF] text-[14px] font-[500]">
          See more doctors
        </a>
      </div>

      <div className="py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {doctors.map((doctor, index) => {
          return (
            <Link href={"/doctor-details"} key={index}>
              <div
                className={`border border-[#E5E7EB] rounded-md p-3 text-center`}
              >
                <Image
                  src={doctor.img}
                  alt="man"
                  width={80}
                  height={80}
                  className="block mb-5 m-auto"
                />
                <p className="text-[#0C1523] text-[14px] md:text-[16px] font-[500]">
                  {doctor.name}
                </p>
                <p className="text-[#667085] text-[12px] md:text-[14px] font-[400]">
                  {doctor.description}
                </p>
                <div className="flex items-center gap-2 md:gap-3 justify-center">
                  <Image
                    src={"/star.svg"}
                    alt="star"
                    width={15}
                    height={15}
                    className=""
                  />
                  <p className="text-[12px] md:text-[14px] font-[400]">
                    4.8 <span className="text-[#667085]">(12k Reviews)</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TopDoctors;
