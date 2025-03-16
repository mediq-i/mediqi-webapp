"use client";
import { useUserQuery } from "@/adapters/BookingAdapter";
import { ServiceProviderAdapter } from "@/adapters/ServiceProviders";
import { queryKeys } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ServiceProviders() {
  const searchParams = useSearchParams();
  const selectedSpecialty = searchParams.get("specialty");
  const selectedRating = searchParams.get("ratings");
  const selectedLanguages = searchParams.get("languages")?.split(",");

  console.log("sp", selectedSpecialty);

  const { data: providerData } = useUserQuery({
    queryCallback: () =>
      ServiceProviderAdapter.searchServiceProvider({
        specialty: selectedSpecialty,
        rating: selectedRating,
        languages: selectedLanguages,
      }),
    queryKey: [queryKeys.PROVIDER_DATA],
  });
  console.log("providers", providerData);

  return (
    <div className="py-5">
      <div className="flex justify-between">
        <p className="font-[600] text-[18px] text-[#1D2939]">
          Showing {providerData?.data?.length}{" "}
          {providerData?.data?.length === 1 ? "result" : "results"}
        </p>
      </div>

      <div className="py-3 grid grid-cols-4 gap-3">
        {providerData?.data?.map((doctor, index) => {
          return (
            <Link href={`/doctor-details?id=${doctor.id}`} key={index}>
              <div
                className={` border border-[#E5E7EB] rounded-md p-3  w-[350px]`}
              >
                <Image
                  src={"/doctor-passport.png"}
                  alt="man"
                  width={350}
                  height={300}
                  className="block mb-5 m-auto"
                />
                <p className="text-[#0C1523] text-[16px] font-[500]">
                  {doctor.first_name} {doctor.last_name}
                </p>
                <p className="text-[#667085] text-[14px] font-[400]">
                  {doctor.specialty}
                </p>
                <div className="flex items-center gap-3 justify-between">
                  
                  <p className="text-[14px] font-[400] flex items-center gap-1">
                    {doctor.rating}
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
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceProviders;
