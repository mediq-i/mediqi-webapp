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
import { format, isBefore, isAfter, addMinutes } from "date-fns";
import { ServiceProviderDetails } from "@/adapters/types/ServiceProviderTypes";
import { BookingAdapter, useBookingMutation } from "@/adapters/BookingAdapter";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { toast } from "sonner";

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  const router = useRouter();
  // Generate 8-digit numeric UID
  const uid = Math.floor(10000000 + Math.random() * 90000000);

  const { data: provider, isLoading: providerLoading } =
    useUserQuery<ServiceProviderDetails>({
      queryKey: ["provider", session.service_provider_id],
      queryCallback: () =>
        ServiceProviderAdapter.getServiceProviderDetails({
          id: session.service_provider_id,
        }),
      slug: "",
    });

  const { mutate: generateToken, isPending: isGeneratingToken } =
    useBookingMutation({
      mutationCallback: BookingAdapter.generateToken,
      params: session.id,
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

  const handleJoinSession = async () => {
    // Check if we already have Agora credentials
    if (session.agora_token && session.agora_channel) {
      // Join directly with existing credentials
      router.push(
        `/appointment-room?token=${session.agora_token}&channel=${session.agora_channel}&uid=${uid}`
      );
    } else {
      // Generate new token if none exists
      generateToken(
        {},
        {
          onSuccess: (response) => {
            const { token, channelName, uid, appId } =
              response.data.agoraTokenData;
            router.push(
              `/appointment-room?token=${token}&channel=${channelName}&uid=${uid}&appId=${appId}`
            );
          },
          onError: (error) => {
            toast.error("Failed to generate video call credentials", {
              description:
                "Please try again or contact support if the issue persists.",
            });
            console.error("Token generation error:", error);
          },
        }
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getSessionStatus = () => {
    const now = new Date();
    const sessionDate = new Date(session.appointment_date);
    const sessionEndTime = addMinutes(sessionDate, 30);

    if (isBefore(now, addMinutes(sessionDate, -5))) {
      return "upcoming";
    } else if (isAfter(now, sessionEndTime)) {
      return "completed";
    } else {
      return "active";
    }
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
              Dr. {providerName}
            </p>
            <p className="text-[#667085] font-[400] text-[14px] capitalize">
              {provider?.data.specialty || "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex items-center mt-5 gap-2">
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
          {/* 
          {getSessionStatus() === "upcoming" && (
            <Button disabled className="flex items-center gap-2 bg-gray-400">
              <Clock className="h-4 w-4" />
              Session starts in{" "}
              {formatDistanceToNow(new Date(session.appointment_date))}
            </Button>
          )} */}
          {/* 
          {getSessionStatus() === "active" && (
            <Button
              onClick={handleJoinSession}
              disabled={isGeneratingToken}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Video className="h-4 w-4" />
              {isGeneratingToken ? "Connecting..." : "Join Session"}
            </Button>
          )} */}

          {/* {getSessionStatus() === "completed" && (
            <Button disabled className="flex items-center gap-2 bg-gray-400">
              <CheckCircle className="h-4 w-4" />
              Session Completed
            </Button>
          )} */}

          <Button
            onClick={handleJoinSession}
            disabled={isGeneratingToken}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Video className="h-4 w-4" />
            {isGeneratingToken ? "Connecting..." : "Join Session"}
          </Button>
        </div>
      </div>
    </div>
  );
}
