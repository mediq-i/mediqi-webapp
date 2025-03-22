import React from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceProviderAdapter, useUserQuery } from "@/adapters/ServiceProviders";
import { queryKeys } from "@/constants";
import { useSearchParams } from "next/navigation";

function DoctorProfile() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("id")
  const { data: providerDetails } = useUserQuery({
    queryCallback: () =>
      ServiceProviderAdapter.getServiceProviderDetails({
       id:providerId,
      }),
    queryKey: [queryKeys.PROVIDER_DETAILS],
  });
  console.log("providers", providerDetails);
  const details = providerDetails?.data
  return (
    <div className="w-[50%]  border-r pr-10">
      <div className="flex justify-between ">
        <div className="flex gap-5 relative">
          <div className="bg-[#EAEEF4] rounded-md w-[100px] h-[100px]">
            <Image
              src={"/doctor-passport.png"}
              alt=""
              height={100}
              width={100}
            />
          </div>
          <div>
            <p className="text-[#0C1523] font-[500] text-[16px]">
              {details?.first_name}  {details?.last_name} 
            </p>
            <p className="text-[#667085] font-[400] text-[14px]">
              {details?.specialty}
            </p>
            <p className="text-[#1570EF] font-[700] text-[18px] absolute bottom-0">
              NGN 40,000
            </p>
          </div>
        </div>
        {/* <div className="flex gap-3">
          <div className="bg-[#F8F8F8] rounded-3xl w-[48px] p-1 flex items-center justify-center h-[36px]">
            <ArrowLeft />
          </div>
          <div className="bg-[#F8F8F8] rounded-3xl w-[48px] p-1 flex items-center justify-center h-[36px]">
            <ArrowRight />
          </div>
        </div> */}
      </div>
      <div className="flex mt-10 p-3 gap-[35px] border rounded-2xl justify-center">
        <div className="border-r w-[150px]">
          <div className="flex items-center mb-1 gap-1">
            <Image src={"/stick-run.svg"} alt="" width={24} height={24} />
            <p className="font-[600] text-[16px]">2 Years</p>
          </div>
          <p className="font-[500] text-[14px] text-[#667085]">Experience</p>
        </div>
        <div className="border-r w-[150px]">
          <div className="flex items-center mb-1 gap-1">
            <Image src={"/UsersFour.svg"} alt="" width={24} height={24} />
            <p className="font-[600] text-[16px]">20</p>
          </div>
          <p className="font-[500] text-[14px] text-[#667085]">Patients</p>
        </div>
        <div className="w-[150px]">
          <div className="flex items-center mb-1 gap-1">
            <Image src={"/pink-star.svg"} alt="" width={24} height={24} />
            <p className="font-[600] text-[16px]">{details?.rating}</p>
          </div>
          <p className="font-[500] text-[14px] text-[#667085]">Reviews</p>
        </div>
      </div>
      <Tabs defaultValue="about" className="w-full mt-10">
        <TabsList className="w-full bg-white justify-between">
          <TabsTrigger
            value="about"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[150px] data-[state=active]:rounded-none  "
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="working time"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[150px] data-[state=active]:rounded-none  "
          >
            Working Time
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[150px] data-[state=active]:rounded-none  "
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="about"
          className="pt-10 text-[#667085] font-[400] text-[16px]"
        >
          Dr. Gustavo Botosh is a highly esteemed endocrinologist with extensive
          experience in diagnosing and treating disorders related to the
          endocrine system. As a specialist in internal medicine with a
          subspecialty in endocrinology, Dr. Botosh is dedicated to providing
          comprehensive and personalized care to his patients
        </TabsContent>
        <TabsContent
          value="working time"
          className="pt-10 text-[#667085] font-[400] text-[16px]"
        >
          <div className="border w-[313px] rounded-3xl p-3 text-center">
            <p className="font-[400] text-[16px] text-[#667085]">
              Monday - Friday, 08:00 - 18:00 PM{" "}
            </p>
          </div>
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
