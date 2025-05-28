"use client";

import React from "react";
import SessionCard from "./session-card";
import { BookingAdapter, useUserQuery } from "@/adapters/BookingAdapter";
import { SessionHistory } from "@/adapters/types/BookingAdapterTypes";

export default function SessionList() {
  const { data: sessions, isLoading } = useUserQuery<SessionHistory>({
    queryKey: ["sessions"],
    queryCallback: () => BookingAdapter.getSessionHistory("confirmed"),
    slug: "",
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="border rounded-xl p-3 w-[546px] h-[200px] bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
      {sessions?.data.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
