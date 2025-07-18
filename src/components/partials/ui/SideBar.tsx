"use client";

import {
  CalendarPlus2,
  // ChevronDown,
  // ChevronUp,
  CircleUser,
  // EllipsisVertical,
  House,
  // Store,
  Wallet,
  X,
  Heart,
  Pill,
  Book,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useUserQuery, UserAdapter } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: House },
  { name: "Session", href: "/session", icon: CalendarPlus2 },
  { name: "Vitals", href: "/profile/vitals", icon: Heart },
  { name: "Prescriptions", href: "/profile/prescriptions", icon: Pill },
  // { name: "Store", href: "#1", icon: Store },
  { name: "Payment", href: "/payment", icon: Wallet },
  {
    name: "Profile",
    href: "/profile",
    icon: CircleUser,
  },
  {
    name: "MEDIQ-i Blog",
    href: "https://www.mediqihealth.com/blog",
    icon: Book,
  },
  // {
  //   name: "More",
  //   href: "#4",
  //   icon: EllipsisVertical,
  //   childPages: [
  //     { name: "Payment Method", href: "/payment-method" },
  //     { name: "FAQs", href: "/faqs" },
  //     { name: "Get Help", href: "/help" },
  //     { name: "Feedback", href: "/feedback" },
  //     { name: "HealthPedia", href: "/healthpedia" },
  //     { name: "About Us", href: "/about-us" },
  //     { name: "Terms and Policy", href: "/terms" },
  //   ],
  // },
];

const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { data, isPending } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });
  // const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_id");

    // Call the logout function from AuthContext
    logout();

    // Redirect to login page
    router.push("/auth/login");
  };

  return (
    <div className="w-[250px] h-full bg-white shadow-lg p-1 flex flex-col">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center md:block">
          <Image src="/mediqi-logo.svg" alt="Logo" width={30} height={30} />
          <button onClick={onClose} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4">
          {isPending ? (
            <Skeleton className="w-[150px] h-[25px]" />
          ) : (
            <div className="text-lg font-semibold">
              {data?.user.first_name} {data?.user.last_name}
            </div>
          )}
          <div className="text-sm text-gray-600">How are you doing today?</div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV_ITEMS.map(({ name, href, icon: Icon }) => {
            // if (childPages) {
            //   return (
            //     <div key={href}>
            //       <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            //         <div
            //           className={`flex items-center justify-between group gap-2 px-4 py-3 border-2 font-[600] hover:border-2 hover:border-[#1570EF] rounded-xl transition-all duration-75 ${
            //             pathname === href
            //               ? "border-[#1570EF] text-[#1570EF] border-2 font-[600]"
            //               : "border-white"
            //           }`}
            //         >
            //           <div className="flex items-center group gap-2">
            //             <Icon className="group-hover:stroke-[#1570EF] stroke-[1.5px]" />
            //             <span className="group-hover:text-[#1570EF] text-sm">
            //               {name}
            //             </span>
            //           </div>
            //           <CollapsibleTrigger asChild>
            //             {isOpen ? (
            //               <ChevronUp className="text-black" />
            //             ) : (
            //               <ChevronDown className="text-black" />
            //             )}
            //           </CollapsibleTrigger>
            //         </div>
            //         <CollapsibleContent className="space-y-2">
            //           <div className=" px-4 py-1">
            //             {childPages.map(({ name, href }) => {
            //               return (
            //                 <Link href={href} key={href}>
            //                   <div
            //                     className={`flex p-0 gap-3 my-2 ${
            //                       pathname === href
            //                         ? "text-[#1570EF] font-[600]"
            //                         : "text-black"
            //                     }`}
            //                   >
            //                     <div className="flex flex-col items-center gap-1">
            //                       <div
            //                         className={`rounded-full  h-[8px] w-[8px] ${
            //                           pathname === href
            //                             ? "bg-[#1570EF]"
            //                             : "bg-[#D8DBE4]"
            //                         }`}
            //                       ></div>
            //                       <div className="border-l h-[20px]"></div>
            //                     </div>
            //                     <div className="text-sm">{name}</div>
            //                   </div>
            //                 </Link>
            //               );
            //             })}
            //           </div>
            //         </CollapsibleContent>
            //       </Collapsible>
            //     </div>
            //   );
            // } else {
            //   return (
            //     <Link key={href} href={href}>
            //       <div
            //         className={`flex items-center group gap-2 px-4 py-3 border-2 font-[600] hover:border-2 hover:border-[#1570EF] rounded-xl transition-all duration-75 ${
            //           pathname === href
            //             ? "border-[#1570EF] text-[#1570EF] border-2 font-[600]"
            //             : "border-white"
            //         }`}
            //       >
            //         <Icon className="group-hover:stroke-[#1570EF] stroke-[1.5px]" />
            //         <span className="group-hover:text-[#1570EF] text-sm">
            //           {name}
            //         </span>
            //       </div>
            //     </Link>
            //   );
            // }

            return (
              <Link key={href} href={href}>
                <div
                  className={`flex items-center group gap-2 px-4 py-3 border-2 font-[600] hover:border-2 hover:border-[#1570EF] rounded-xl transition-all duration-75 ${
                    pathname === href
                      ? "border-[#1570EF] text-[#1570EF] border-2 font-[600]"
                      : "border-white"
                  }`}
                >
                  <Icon className="group-hover:stroke-[#1570EF] stroke-[1.5px]" />
                  <span className="group-hover:text-[#1570EF] text-sm">
                    {name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout button at the bottom */}
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 border-2 border-red-200 text-red-600 font-[600] hover:border-red-400 hover:text-red-700 rounded-xl transition-all duration-75 w-full"
        >
          <LogOut className="stroke-[1.5px]" />
          <span className="text-sm">Logout</span>
        </button>
      </div>

      {/* <div className="w-[240px] m-auto bg-gradient-to-r from-[#BDB4FE] via-[#A391FC] to-[#7A5AF8] rounded-md text-center p-4 relative hidden md:block">
        <p className="text-white font-[600] text-[18px] my-2">
          Refer A Friend & Earn
        </p>
        <p className="text-white font-[400] text-[14px] my-2">
          Invite your friends to use Mediq and earn ₦1,000 in your wallet
        </p>
        <button className="border-4 border-[#11111133] bg-[#FFBC0B] w-[212px] rounded-3xl p-2">
          Refer A Friend
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
