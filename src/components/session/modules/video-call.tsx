"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useRemoteUsers,
  useRemoteAudioTracks,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  useRTCClient,
  useVolumeLevel,
  useConnectionState,
  useNetworkQuality,
} from "agora-rtc-react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { toast } from "sonner";
import { LocalVideoView } from "@/components/video/LocalVideoView";
import { RemoteVideoView } from "@/components/video/RemoteVideoView";

export default function VideoCall() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const agoraClient = useRTCClient();
  const connectionState = useConnectionState();
  const networkQuality = useNetworkQuality();

  // const hasConnected = useRef(false);
  // const joinAttempts = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeConnection, _setActiveConnection] = useState(true);
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const [lastWarningTime, setLastWarningTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);

  // Get tracks using hooks
  const audioTrack = useLocalMicrophoneTrack(micOn);
  const cameraTrack = useLocalCameraTrack(cameraOn);

  // Move readyToPublish check to include isConnected
  const readyToPublish =
    agoraClient.connectionState === "CONNECTED" &&
    audioTrack.localMicrophoneTrack &&
    cameraTrack.localCameraTrack;

  const localUserVolumeLevel = useVolumeLevel(audioTrack.localMicrophoneTrack!);

  // Join channel with proper error handling
  const { isConnected, isLoading } = useJoin(
    {
      appid: "145cb3730d4a4445bf93a36407675ff4",
      channel: searchParams.get("channel")!,
      token: searchParams.get("token")!.split(" ").join("+")!,
      uid: Number(searchParams.get("uid")!),
    },
    activeConnection
  );

  const handlePublishTracks = async () => {
    console.log(readyToPublish);
    try {
      // Double check connection status
      if (!isConnected) {
        console.log("Not connected to channel yet");
        return;
      }

      if (!readyToPublish) {
        console.log("Tracks not ready yet");
        return;
      }

      await agoraClient.setClientRole("host");

      const publishedTracks = agoraClient.localTracks;
      if (publishedTracks.length > 0) {
        console.log("Tracks already published");
        return;
      }

      console.log("Publishing tracks...");
      //@ts-expect-error localTracks is not typed
      const res = await agoraClient.publish([
        audioTrack.localMicrophoneTrack,
        cameraTrack.localCameraTrack,
      ]);
      console.log(res);
      console.log("Tracks published successfully");
    } catch (error) {
      console.error("Failed to publish stream:", error);
      toast.error("Failed to publish media stream");
    }
  };

  // Modify the publish effect to wait for connection
  useEffect(() => {
    if (readyToPublish && isConnected) {
      console.log("Attempting to publish tracks...");
      handlePublishTracks();
    }
  }, [readyToPublish]);

  // Handle remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  console.log(remoteUsers);

  // Play remote audio tracks
  // Play audio tracks for remote users only
  audioTracks.map((track) => track.play());
  // useEffect(() => {
  //   audioTracks.forEach((track) => track.play());
  // }, [audioTracks]);

  // Network quality monitoring
  const warningCooldown = 60000;
  const checkNetworkQuality = useCallback(() => {
    const currentTime = Date.now();
    if (
      networkQuality.delay > 300 &&
      currentTime - lastWarningTime > warningCooldown
    ) {
      toast.warning("Unstable Internet Connection", {
        duration: 5000,
        id: "network-warning",
      });
      setLastWarningTime(currentTime);
    }
  }, [networkQuality.delay, lastWarningTime]);

  useEffect(() => {
    checkNetworkQuality();
  }, [checkNetworkQuality]);

  // Initial mute state
  // useEffect(() => {
  //   if (audioTrack.localMicrophoneTrack || cameraTrack.localCameraTrack) {
  //     audioTrack.localMicrophoneTrack?.setMuted(true);
  //     cameraTrack.localCameraTrack?.setMuted(true);
  //   }
  // }, [audioTrack.localMicrophoneTrack, cameraTrack.localCameraTrack]);

  // Add connection state logging
  useEffect(() => {
    console.log("Connection state changed:", connectionState);
  }, [connectionState]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleEndCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVideoMute = async () => {
    if (cameraTrack.localCameraTrack) {
      await cameraTrack.localCameraTrack.setEnabled(!cameraOn);
      setCamera(!cameraOn);
    }
  };

  const handleAudioMute = async () => {
    if (audioTrack.localMicrophoneTrack) {
      await audioTrack.localMicrophoneTrack.setEnabled(!micOn);
      setMic(!micOn);
    }
  };

  const handleEndCall = async () => {
    try {
      if (audioTrack.localMicrophoneTrack) {
        audioTrack.localMicrophoneTrack.close();
      }
      if (cameraTrack.localCameraTrack) {
        cameraTrack.localCameraTrack.close();
      }
      await agoraClient.leave();
      router.push("/session");
    } catch (error) {
      console.error("Error ending call:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <div className="animate-spin h-6 w-6 md:h-8 md:w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm md:text-base">Connecting to video call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-2 md:p-6">
      <div className="max-w-7xl mx-auto relative">
        {/* Timer */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
          <div className="bg-gray-800 rounded-lg px-2 md:px-4 py-1 md:py-2 text-white text-sm md:text-base">
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        {/* Video Container */}
        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-120px)]">
          {/* Remote Stream */}
          <div className="flex-1 bg-gray-800 rounded-lg md:rounded-2xl overflow-hidden min-h-[300px] md:min-h-0">
            {remoteUsers.map((user) => (
              <RemoteVideoView key={user.uid} user={user} />
            ))}
          </div>

          {/* Local Stream */}
          <div className="w-full md:w-[300px] h-[200px] md:h-auto bg-gray-800 rounded-lg md:rounded-2xl overflow-hidden">
            <LocalVideoView
              localMicrophoneTrack={audioTrack.localMicrophoneTrack}
              localCameraTrack={cameraTrack.localCameraTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              localUserVolumeLevel={localUserVolumeLevel}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-gray-900/80 p-2 rounded-full">
          <Button
            onClick={handleAudioMute}
            variant={micOn ? "secondary" : "destructive"}
            size="lg"
            className="rounded-full h-10 w-10 md:h-12 md:w-12 p-0"
          >
            {micOn ? (
              <Mic className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <MicOff className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </Button>

          <Button
            onClick={handleEndCall}
            variant="destructive"
            size="lg"
            className="rounded-full h-12 w-12 md:h-14 md:w-14 p-0"
          >
            <PhoneOff className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <Button
            onClick={handleVideoMute}
            variant={cameraOn ? "secondary" : "destructive"}
            size="lg"
            className="rounded-full h-10 w-10 md:h-12 md:w-12 p-0"
          >
            {cameraOn ? (
              <Video className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <VideoOff className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
