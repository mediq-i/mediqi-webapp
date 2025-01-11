import {
  CircleUser,
  Cross,
  EllipsisVertical,
  House,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="w-64 h-full bg-white shadow-lg fixed p-1">
      <div className="p-6">
        <div className="text-xl font-bold">
          <Image src={"/mediqi-logo.svg"} alt="" width={30} height={30} />
        </div>
        <div className="mt-4">
          <div className="text-lg font-semibold">User Name</div>
          <div className="text-sm text-gray-600">How are you doing today?</div>
        </div>
        <nav className="mt-8">
          <Link href={"/"}>
            <div
              className={`flex items-center gap-2 my-3 p-3 ${
                pathname === "/" ? "bg-[#1570EF] rounded p-3 text-white" : ""
              }`}
            >
              <House />
              <div className="block  rounded transition duration-200 hover:bg-gray-200">
                Home
              </div>
            </div>
          </Link>
          <Link href={""}>
            <div
              className={`flex items-center gap-2 my-3 p-3 ${
                pathname === "/session"
                  ? "bg-[#1570EF] rounded p-3 text-white"
                  : ""
              }`}
            >
              <Cross />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                Session
              </div>
            </div>
          </Link>
          <Link href={""}>
            <div
              className={`flex items-center gap-2 my-3 p-3 ${
                pathname === "/profile"
                  ? "bg-[#1570EF] rounded p-3 text-white"
                  : ""
              }`}
            >
              <Wallet />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                Profile
              </div>
            </div>
          </Link>
          <Link href={""}>
            <div
              className={`flex items-center gap-2 my-3 p-3 ${
                pathname === "/payment"
                  ? "bg-[#1570EF] rounded p-3 text-white"
                  : ""
              }`}
            >
              <CircleUser />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                Payment
              </div>
            </div>
          </Link>
          <Link href={""}>
            <div
              className={`flex items-center gap-2 my-3 p-3 ${
                pathname === "/more"
                  ? "bg-[#1570EF] rounded p-3 text-white"
                  : ""
              }`}
            >
              <EllipsisVertical />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                More
              </div>
            </div>
          </Link>
        </nav>
      </div>
      <div className="w-[240px] m-auto h-[221px]  bg-gradient-to-r from-[#BDB4FE] via-[#A391FC] to-[#7A5AF8] rounded-md text-center p-3 pt-14 relative">
        <Image
          src={"aero.svg"}
          alt=""
          width={150}
          height={150}
          className="absolute top-[-50px] left-[45px]"
        />
        <p className="text-white font-[600] text-[18px] my-2">
          Refer A Friend & Earn
        </p>
        <p className="text-white font-[400] text-[14px] my-2">
          Invite your friends to use Mediq and earn ₦1,000 in your wallet
        </p>
        <button className="border-4 border-[#11111133] bg-[#FFBC0B] w-[212px] rounded-3xl p-2">
          Refer A Friend
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
