"use client";
import { useUserQuery } from "@/adapters/BookingAdapter";
import { ServiceProviderAdapter } from "@/adapters/ServiceProviders";
import { queryKeys } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

function ServiceProviders() {
  const searchParams = useSearchParams();
  const selectedSpecialty = searchParams.get("specialty");
  const selectedRating = searchParams.get("ratings");
  const selectedLanguages = searchParams.get("languages")?.split(",");

  const { data: providerData, isLoading } = useUserQuery({
    queryCallback: () =>
      ServiceProviderAdapter.searchServiceProvider({
        specialty: selectedSpecialty,
        rating: selectedRating,
        languages: selectedLanguages,
      }),
    queryKey: [queryKeys.PROVIDER_DATA],
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="py-5 px-4 md:px-0">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-7 w-48" />
        </div>
        <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="border border-[#E5E7EB] rounded-md p-3 w-full"
            >
              <Skeleton className="h-[200px] md:h-[300px] w-full mb-5" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 px-4 md:px-0">
      <div className="flex justify-between mb-4">
        <p className="font-[600] text-[16px] md:text-[18px] text-[#1D2939]">
          Showing {providerData?.data?.length}{" "}
          {providerData?.data?.length === 1 ? "result" : "results"}
        </p>
      </div>

      <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {providerData?.data?.map((doctor) => {
          const hasRating = doctor.rating && doctor.rating > 0;

          return (
            <Link href={`/doctor-details?id=${doctor.id}`} key={doctor.id}>
              <div className="border border-[#E5E7EB] rounded-md p-3 w-full hover:shadow-md transition-shadow">
                {doctor?.profile_image ? (
                  <Image
                    src={doctor?.profile_image}
                    alt={`${doctor.first_name} ${doctor.last_name}`}
                    width={350}
                    height={300}
                    className="block mb-5 m-auto rounded-lg object-cover h-[200px] md:h-[300px] w-full"
                  />
                ) : (
                  <div className="mb-5 flex items-center justify-center h-[200px] md:h-[300px] bg-[#F8F9FA] rounded-lg">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32">
                      <AvatarFallback className="text-2xl md:text-3xl bg-[#EAEEF4] text-gray-700">
                        {getInitials(doctor.first_name, doctor.last_name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}

                <p className="text-[#0C1523] text-[14px] md:text-[16px] font-[500] mb-1">
                  Dr. {doctor.first_name} {doctor.last_name}
                </p>
                <p className="text-[#667085] text-[12px] md:text-[14px] font-[400] mb-3 capitalize">
                  {doctor.specialty === "general-medicine"
                    ? "General Practitioner"
                    : doctor.specialty}
                </p>

                <div className="flex items-center gap-2 md:gap-3 justify-between">
                  {hasRating ? (
                    <p className="text-[12px] md:text-[14px] font-[400] flex items-center gap-1">
                      {doctor.rating}
                      <Image
                        src={"/star.svg"}
                        alt="star"
                        width={12}
                        height={12}
                        className="inline md:w-[15px] md:h-[15px]"
                      />
                    </p>
                  ) : (
                    <p className="text-[12px] md:text-[14px] text-[#667085]">
                      No ratings yet
                    </p>
                  )}
                  <p className="font-black text-[14px] md:text-[16px]">
                    NGN 2,000
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {!providerData?.data.length && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-[14px] md:text-[16px]">
            No service providers found
          </p>
        </div>
      )}
    </div>
  );
}

export default ServiceProviders;
