import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StickyNote } from "lucide-react";
import React from "react";
import { Session } from "@/adapters/types/BookingAdapterTypes";
import {
  ServiceProviderAdapter,
  useUserQuery,
} from "@/adapters/ServiceProviders";
import { format } from "date-fns";
import { ServiceProviderDetails } from "@/adapters/types/ServiceProviderTypes";
interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const { data: provider, isLoading: providerLoading } =
    useUserQuery<ServiceProviderDetails>({
      queryKey: ["provider", session.service_provider_id],
      queryCallback: () =>
        ServiceProviderAdapter.getServiceProviderDetails({
          id: session.service_provider_id,
        }),
      slug: "",
    });

  const formattedDate = format(
    new Date(session.appointment_date),
    "MMM dd, yyyy - hh:mm a"
  );

  const providerName = provider
    ? `${provider.data.first_name} ${provider.data.last_name}`
    : "Loading...";

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <div className="border rounded-xl p-3 w-[546px]">
        <div className="mb-3 flex gap-3 p-2">
          <p className="border-r pr-3">{formattedDate}</p>
          {/* <p className="text-[#1570EF]">
            <span className="text-[#667085]">Session ID :</span> #{session.id}
          </p> */}
        </div>
        <div className="flex gap-5 border-t p-2">
          {providerLoading ? (
            <div className="animate-pulse bg-gray-200 rounded-full h-12 w-12" />
          ) : (
            <Avatar className="h-12 w-12 bg-[#EAEEF4]">
              <AvatarFallback className="bg-[#EAEEF4] text-gray-700">
                {getInitials(providerName)}
              </AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="text-[#090909] font-[700] text-[16px]">
              {providerName}
            </p>
            <p className="text-[#667085] font-[400] text-[14px]">
              {provider?.data.specialty || "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex items-center mt-5 gap-1">
          <Dialog>
            <DialogTrigger className="w-[247px] p-3 bg-[#F2F4F7] rounded-3xl text-black">
              Session Details
            </DialogTrigger>
            <DialogContent className="max-h-[600px] overflow-y-auto">
              <DialogHeader className="border-b pb-4">
                <DialogTitle>Session Detail</DialogTitle>
                <DialogDescription>{formattedDate}</DialogDescription>
              </DialogHeader>

              {/* <div className="border bg-[#F2F4F7] flex justify-between rounded-lg h-[40px]">
                <p className="text-[#1570EF] flex items-center p-3">
                  <span className="text-[#667085]">Session ID :</span> #
                  {session.id}
                </p>
                <div className="bg-[#18181B0A] w-[40px] items-center flex justify-center">
                  <Copy className="h-[15px]" />
                </div>
              </div> */}

              <div className="flex gap-5 border rounded-lg p-2">
                {providerLoading ? (
                  <div className="animate-pulse bg-gray-200 rounded-full h-12 w-12" />
                ) : (
                  <Avatar className="h-12 w-12 bg-[#EAEEF4]">
                    <AvatarFallback className="bg-[#EAEEF4] text-gray-700">
                      {getInitials(providerName)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <p className="text-[#090909] font-[500] text-[14px]">
                    {providerName}
                  </p>
                  <p className="text-[#667085] font-[400] text-[12px]">
                    {provider?.data.specialty || "Loading..."}
                  </p>
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-4 border-y">
                <div>
                  <div className="min-h-[80px]">
                    <p className="text-[14px] text-[#7D8593]">Symptoms</p>
                    <div className="flex gap-3 mt-2 flex-wrap">
                      {session.patient_symptoms.map((symptom, index) => (
                        <p
                          key={index}
                          className="px-2.5 py-1 text-sm border rounded-3xl"
                        >
                          {symptom}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="min-h-[80px]">
                    <p className="text-[14px] text-[#7D8593]">Status</p>
                    <p className="capitalize">{session.status}</p>
                  </div>
                </div>

                <div>
                  <div className="min-h-[80px]">
                    <p className="text-[14px] text-[#7D8593]">
                      Length of symptoms
                    </p>
                    <p className="">{session.patient_symptom_duration}</p>
                  </div>
                  <div className="min-h-[80px]">
                    <p className="text-[14px] text-[#7D8593]">Payment Status</p>
                    <p className="">{session.payment_status || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="border bg-[#F2F4F7] flex justify-between rounded-lg h-[40px]">
                <p className="flex items-center p-3 text-[14px] text-[#475467] font-[400]">
                  <StickyNote className="h-[15px]" />{" "}
                  {session.patient_ailment_description}
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* <RescheduleSession /> */}
        </div>
      </div>
    </div>
  );
}
