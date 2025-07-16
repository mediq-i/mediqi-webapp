import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import SessionList from "./session-list";
import {
  AcceptSessionRequest,
  AddReview,
  RebookSession,
} from "@/components/session/modules";
import Image from "next/image";

export default function SessionTabs() {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="flex md:items-center gap-4 md:gap-0 flex-col md:flex-row md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
        <TabsList className="bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4  flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Upcoming</span>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            disabled
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4  flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Completed</span>
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            disabled
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4  flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            <span>Pending</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="upcoming" className="mt-6">
        <SessionList />
      </TabsContent>

      <TabsContent value="completed" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 rounded-full p-2">
                  <Image
                    src="/doctor-detail-pic.png"
                    alt="Dr. Emily Harper"
                    height={48}
                    width={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Dr. Emily Harper, MD
                  </h3>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Feb 18, 2024</p>
                <p className="text-sm text-gray-500">02:30 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <RebookSession />
              <AddReview />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="pending" className="mt-6">
        <div className="grid gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 rounded-full p-2">
                  <Image
                    src="/doctor-detail-pic.png"
                    alt="Dr. Emily Harper"
                    height={48}
                    width={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Dr. Emily Harper, MD
                  </h3>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">
                  Session ID: #ME88010
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Sessions</p>
                <p className="text-lg font-semibold text-gray-900">2</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-lg font-semibold text-gray-900">N80,000</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Planning Schedule</h4>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-blue-500">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
                  <p className="text-sm text-gray-500">
                    12 Oct, 2024 - 10:30AM-11:30AM
                  </p>
                  <p className="font-medium text-gray-900">Session 1</p>
                </div>
                <div className="relative pl-6 border-l-2 border-blue-500">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />
                  <p className="text-sm text-gray-500">
                    14 Oct, 2024 - 10:30AM-11:30AM
                  </p>
                  <p className="font-medium text-gray-900">Session 2</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <AcceptSessionRequest />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
