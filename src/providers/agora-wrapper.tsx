"use client";

import AgoraRTC from "agora-rtc-react";
import dynamic from "next/dynamic";

const AgoraRTCProvider = dynamic(
  () => import("agora-rtc-react").then((mod) => mod.AgoraRTCProvider),
  {
    ssr: false,
  }
);

interface IAgoraProvider {
  children: React.ReactNode;
}

const AgoraWrapper = ({ children }: IAgoraProvider) => {
  const client = AgoraRTC.createClient({ codec: "vp8", mode: "live" });
  console.log("[Agora Initialised]");

  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
};

export default AgoraWrapper;
