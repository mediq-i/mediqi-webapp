import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  AcceptSessionRequest,
  AddReview,
  RebookSession,
} from "@/components/session/modules";

import { Metadata } from "next";
import SessionList from "@/components/session/ui/session-list";
import ProtectedRoute from "@/utils/protected-route";

export const metadata: Metadata = {
  title: "Sessions / MEDQI-I",
  description: "MEDQI-I",
};

function Session() {
  return (
    <ProtectedRoute>
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
              value="completed"
              className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[350px] data-[state=active]:rounded-none  "
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:shadow-none data-[state=active]:border-dashed data-[state=active]:border-b data-[state=active]:border-[#1570EF] w-[350px] data-[state=active]:rounded-none  "
            >
              Pending
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="upcoming"
            className="pt-10 font-[400] text-[16px]"
          >
            <SessionList />
          </TabsContent>
          <TabsContent
            value="completed"
            className="pt-10 text-[#667085] font-[400] text-[16px]"
          >
            <div className="border rounded-xl p-3 w-[546px]">
              <div className="mb-3 flex gap-3 p-2">
                <p className="border-r pr-3">Feb 18, 2024 - 02:30 pm </p>
                <p className="text-[#1570EF]">
                  {" "}
                  <span className="text-[#667085]">Session ID :</span> #ME88010
                </p>
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
                <RebookSession />

                <AddReview />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pending" className="pt-10 ">
            <div className="border rounded-xl p-3 w-[546px]">
              <div className="flex gap-5 p-2">
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
              <div>
                <div className="flex gap-[180px] my-3">
                  <div>
                    <p className="text-[14px] font-[400] text-[#7D8593]">
                      Sessions
                    </p>
                    <p className="text-[14px] font-[500] text-[#1D2939]">2</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-[400] text-[#7D8593]">
                      Amount
                    </p>
                    <p className="text-[14px] font-[500] text-[#1D2939]">
                      N80,000
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-[#475467] font-[500]">
                  Planning Schedule
                </p>
                <div className="p-5">
                  <div className="pl-5 pb-10  border-l border-dashed border-[#2E90FA]">
                    <p className="text-[14px] text-[#667085] font-[500]">
                      12 Oct, 2024- 10:30AM-11:30AM
                    </p>
                    <p className="text-[16px] text-[#1D2939] font-[600]">
                      Session 1
                    </p>
                  </div>
                  <div className="pl-5 pb-10  border-l border-dashed border-[#2E90FA]">
                    <p className="text-[14px] text-[#667085] font-[500]">
                      14 Oct, 2024- 10:30AM-11:30AM
                    </p>
                    <p className="text-[16px] text-[#1D2939] font-[600]">
                      Session 2
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-5 gap-1">
                <Dialog>
                  <DialogTrigger className="w-[247px] p-3 bg-[#F2F4F7] rounded-3xl text-black">
                    View Details
                  </DialogTrigger>
                  <DialogContent className="max-h-[600px] overflow-y-auto">
                    <DialogHeader className="border-b pb-5">
                      <DialogTitle>
                        Request Appointment{" "}
                        <span className="text-[#1570EF]"> #ME88010</span>
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex gap-5 border rounded-lg p-2">
                      <div className="bg-[#EAEEF4] rounded-full">
                        <Image
                          src={"/doctor-detail-pic.png"}
                          alt=""
                          height={48}
                          width={48}
                        />
                      </div>
                      <div>
                        <p className="text-[#090909] font-[500] text-[14px]">
                          Dr. Emily Harper, MD
                        </p>
                        <p className="text-[#667085] font-[400] text-[12px]">
                          Cardiologist
                        </p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-2 bg-[#F9FAFB]">
                      <p className="text[14px] font-[500] text-[#667085]">
                        Reason
                      </p>
                      <p className="text[14px] font-[400] text-[#1D2939]">
                        Eating sweet foods, not brushing your teeth regularly,
                        often drink cold water when eating food that is still
                        hot.
                      </p>
                    </div>
                    <div className="flex gap-[180px] my-1 border-y py-3">
                      <div className="">
                        <p className="text-[14px] font-[400] text-[#7D8593]">
                          Sessions
                        </p>
                        <p className="text-[14px] font-[500] text-[#1D2939]">
                          2
                        </p>
                      </div>
                      <div>
                        <p className="text-[14px] font-[400] text-[#7D8593]">
                          Amount
                        </p>
                        <p className="text-[14px] font-[500] text-[#1D2939]">
                          N80,000
                        </p>
                      </div>
                    </div>

                    <p className="text-[14px] text-[#475467] font-[500]">
                      Planning Schedule
                    </p>
                    <div className="p-5">
                      <div className="pl-5 pb-10  border-l border-dashed border-[#2E90FA]">
                        <p className="text-[14px] text-[#667085] font-[500]">
                          12 Oct, 2024- 10:30AM-11:30AM
                        </p>
                        <p className="text-[16px] text-[#1D2939] font-[600]">
                          Session 1
                        </p>
                      </div>
                      <div className="pl-5 pb-10  border-l border-dashed border-[#2E90FA]">
                        <p className="text-[14px] text-[#667085] font-[500]">
                          14 Oct, 2024- 10:30AM-11:30AM
                        </p>
                        <p className="text-[16px] text-[#1D2939] font-[600]">
                          Session 2
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between">
                      <button className=" p-3 w-[113px] rounded-3xl font-[600] bg-[#F2F4F7]">
                        Decline
                      </button>
                      <button className=" p-3 bg-[#1570EF] w-[289px] rounded-3xl text-white">
                        Accept Request
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>

                <AcceptSessionRequest />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}

export default Session;
