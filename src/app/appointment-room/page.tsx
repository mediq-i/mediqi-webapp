"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the VideoCall component with no SSR
const VideoCall = dynamic(
  () => import("@/components/session/modules/video-call"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <div className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm md:text-base">Loading video call...</p>
        </div>
      </div>
    ),
  }
);

export default function AppointmentRoom() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="text-white text-center">
            <div className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm md:text-base">Loading video call...</p>
          </div>
        </div>
      }
    >
      <VideoCall />
    </Suspense>
  );
}
