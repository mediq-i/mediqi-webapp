import React from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ServiceProviderAdapter,
  useUserQuery,
} from "@/adapters/ServiceProviders";
import { queryKeys } from "@/constants";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function DoctorProfile() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("id");

  const { data: providerDetails, isLoading } = useUserQuery({
    queryCallback: () =>
      ServiceProviderAdapter.getServiceProviderDetails({
        id: providerId,
      }),
    queryKey: [queryKeys.PROVIDER_DETAILS],
  });

  const details = providerDetails?.data;

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName || !lastName) return "DR";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="w-full lg:w-[50%] border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-10">
        <div className="flex justify-between">
          <div className="flex gap-5 relative">
            <Skeleton className="h-[100px] w-[100px] rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24 mt-4" />
            </div>
          </div>
        </div>

        <div className="flex mt-10 p-3 gap-[35px] border rounded-2xl justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${i !== 3 ? "border-r" : ""} w-[150px]`}>
              <Skeleton className="h-6 w-20 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Skeleton className="h-10 w-full mb-6" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[50%] border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 lg:pr-10">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-5 relative items-center">
          {details?.profile_image ? (
            <div className="bg-[#EAEEF4] rounded-md w-[80px] h-[80px] md:w-[100px] md:h-[100px] overflow-hidden">
              <Image
                src={details?.profile_image}
                alt={`${details.first_name} ${details.last_name}`}
                height={100}
                width={100}
                className="object-cover h-full w-full"
              />
            </div>
          ) : (
            <Avatar className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] rounded-md">
              <AvatarFallback className="bg-[#EAEEF4] text-gray-700 text-xl md:text-2xl">
                {getInitials(details?.first_name, details?.last_name)}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="text-[#0C1523] font-[500] text-[14px] md:text-[16px]">
              Dr. {details?.first_name} {details?.last_name}
            </p>
            <p className="text-[#667085] font-[400] text-[12px] md:text-[14px] capitalize">
              {details?.specialty}
            </p>

            <p className="text-[#1570EF] font-[700] mt-2 text-[16px] md:text-[18px]">
              NGN{" "}
              {details?.id === "0ac3ba83-f000-4615-964f-b4520f1a2446"
                ? "5,000"
                : "2,500"}{" "}
              per session
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row mt-6 md:mt-10 p-3 gap-4 md:gap-[35px] border rounded-2xl justify-center">
        <div className="border-b sm:border-b-0 sm:border-r pb-4 sm:pb-0 w-full sm:w-[150px]">
          <div className="flex items-center mb-1 gap-1">
            <Image src="/stick-run.svg" alt="" width={24} height={24} />
            <p className="font-[600] text-[14px] md:text-[16px]">
              {details?.years_of_experience} Years
            </p>
          </div>
          <p className="font-[500] text-[12px] md:text-[14px] text-[#667085]">
            Experience
          </p>
        </div>
        {/* 
        <div className="border-b sm:border-b-0 sm:border-r pb-4 sm:pb-0 w-full sm:w-[150px]">
          <div className="flex items-center mb-1 gap-1">
            <Image src="/UsersFour.svg" alt="" width={24} height={24} />
            <p className="font-[600] text-[14px] md:text-[16px]">
              {details?.seen || 0}
            </p>
          </div>
          <p className="font-[500] text-[12px] md:text-[14px] text-[#667085]">
            Patients
          </p>
        </div> */}

        <div className="w-full sm:w-[150px]">
          <div className="flex items-center mb-1 gap-1">
            <Image src="/pink-star.svg" alt="" width={24} height={24} />
            <p className="font-[600] text-[14px] md:text-[16px]">
              {details?.rating || 0}
            </p>
          </div>
          <p className="font-[500] text-[12px] md:text-[14px] text-[#667085]">
            Rating
          </p>
        </div>
      </div>

      <Tabs defaultValue="about" className="w-full mt-6 md:mt-10">
        <TabsList className="w-full bg-white justify-between overflow-x-auto">
          <TabsTrigger
            value="about"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[100px] md:w-[150px] data-[state=active]:rounded-none"
          >
            About
          </TabsTrigger>

          <TabsTrigger
            disabled
            value="reviews"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[100px] md:w-[150px] data-[state=active]:rounded-none"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="about"
          className="pt-10 text-[#667085] font-[400] text-[16px]"
        >
          {details?.bio || "No bio available"}
        </TabsContent>

        <TabsContent
          value="reviews"
          className="pt-10 text-[#667085] font-[400] text-[16px]"
        >
          <div className="border rounded-xl p-3 text-center">
            <div className="flex justify-between">
              <div className="flex gap-5 relative">
                <div className="bg-[#EAEEF4] rounded-full">
                  <Image
                    src={"/doctor-detail-pic.png"}
                    alt=""
                    height={48}
                    width={48}
                  />
                </div>
                <div>
                  <p className="text-[#090909] font-[700] text-[16px]">
                    Carla Donin
                  </p>
                  <p className="text-[#667085] font-[400] text-[14px]">
                    Feb 25, 2024
                  </p>
                </div>
              </div>
              <MoreVertical className="text-black" />
            </div>
            <p className="text-left py-5">
              Dr. Gustavo Botosh has been an incredible support in managing my
              diabetes. His thorough explanations and compassionate care have
              made a huge difference in my health. I always feel heard and
              well-cared for during my visits. Highly recommend him to anyone
              needing an endocrinologist!
            </p>
            <div className="flex items-center mb-1 gap-1">
              <Image src={"/star.svg"} alt="" width={24} height={24} />
              <p className="font-[600] text-[16px] text-black">5.0</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DoctorProfile;
