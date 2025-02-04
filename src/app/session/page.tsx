import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import React from "react";

function Session() {
  return (
    <div className="p-6">
      <Tabs defaultValue="upcoming" className="w-full mt-10">
        <TabsList className="w-full bg-white justify-between">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[350px] data-[state=active]:rounded-none  "
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="working time"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[350px] data-[state=active]:rounded-none  "
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[350px] data-[state=active]:rounded-none  "
          >
            Pending
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="upcoming"
          className="pt-10 font-[400] text-[16px]"
        >
          <div className="border rounded-xl p-3 w-[546px]">
            <div className="mb-3 flex gap-3 p-2">
              <p className="border-r pr-3">Feb 18, 2024 - 02:30 pm </p>
              <p className="text-[#1570EF]"> <span className="text-[#667085]">Session ID :</span> #ME88010</p>
            </div>
            <div className="flex gap-5 border-t p-2">
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
                  Dr. Emily Harper, MD
                </p>
                <p className="text-[#667085] font-[400] text-[14px]">
                  Cardiologist
                </p>
              </div>
            </div>

            <div className="flex items-center mt-5 gap-1">
              <button className="w-[247px] p-3 bg-[#F2F4F7] rounded-3xl text-black">
                Session Details
              </button>
              <button className="w-[247px] p-3 bg-[#1570EF] rounded-3xl text-white">
                Reschedule session
              </button>
            </div>
          </div>
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

export default Session;
