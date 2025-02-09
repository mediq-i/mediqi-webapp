"use client";
import {
  CalendarPlus2,
  CircleUser,
  EllipsisVertical,
  House,
  Store,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useUserQuery, UserAdapter } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const { data, isPending } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });

  return (
    <div className="w-[250px] h-full bg-white shadow-lg fixed p-1">
      <div className="p-6">
        <div className="text-xl font-bold">
          <Image src={"/mediqi-logo.svg"} alt="" width={30} height={30} />
        </div>
        <div className="mt-4">
          {!isPending ? (
            <div className="text-lg font-semibold">
              {data?.user.first_name} {data?.user.last_name}
            </div>
          ) : (
            <Skeleton className="w-[150px] h-[25px]" />
          )}
          <div className="text-sm text-gray-600">How are you doing today?</div>
        </div>
        <nav className="mt-8">
          <Link href={"/"}>
            <div
               className={`flex items-center gap-2  p-3 hover:border hover:border-[#1570EF] ${
                pathname === "/" ? "border-[#1570EF] p-3 text-[#1570EF] border-2 rounded-lg" : ""
              }`}
            >
              <House />
              <div className="block  rounded transition duration-200 hover:bg-gray-200">
                Home
              </div>
            </div>
          </Link>
          <Link href={"/session"}>
            <div
              className={`flex items-center hover:border hover:border-[#1570EF] gap-2  p-3 ${
                pathname === "/session"
                  ? "border-[#1570EF] p-3 text-[#1570EF] border-2 rounded-lg"
                  : ""
              }`}
            >
              <CalendarPlus2 />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                Session
              </div>
            </div>
          </Link>
          <Link href={"/store"}>
            <div
              className={`flex items-center hover:border hover:border-[#1570EF] gap-2  p-3 ${
                pathname === "/session"
                  ? "border-[#1570EF] p-3 text-[#1570EF] border-2 rounded-lg"
                  : ""
              }`}
            >
              <Store />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                Store
              </div>
            </div>
          </Link>
          <Link href={""}>
            <div
              className={`flex items-center hover:border hover:border-[#1570EF] gap-2  p-3 ${
                pathname === "/payment"
                  ? "border-[#1570EF] p-3 text-[#1570EF] border-2 rounded-lg"
                  : ""
              }`}
            >
              <Wallet />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                Payment
              </div>
            </div>
          </Link>
          <Link href={""}>
            <div
              className={`flex items-center hover:border hover:border-[#1570EF] gap-2  p-3 ${
                pathname === "/profile"
                  ? "border-[#1570EF] p-3 text-[#1570EF] border-2 rounded-lg"
                  : ""
              }`}
            >
              <CircleUser />
              <div className="block rounded transition duration-200 hover:bg-gray-200">
                Profile
              </div>
            </div>
          </Link>
          <Link href={""}>
            <div
              className={`flex items-center hover:border hover:border-[#1570EF] gap-2  p-3 ${
                pathname === "/more"
                  ? "border-[#1570EF] p-3 text-[#1570EF] border-2 rounded-lg"
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
      <div className="w-[240px] m-auto h-[221px] mt-[60px]  bg-gradient-to-r from-[#BDB4FE] via-[#A391FC] to-[#7A5AF8] rounded-md text-center p-3 pt-14 relative">
        <Image
          src={"aero.svg"}
          alt=""
          width={150}
          height={150}
          className="absolute top-[-100]"
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
