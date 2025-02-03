"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext, IUserContext } from "@/providers/user-provider";
import ApiService from "@/adapters/utils/api-service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setToken } = useContext(UserContext) as IUserContext;
  const pingService = new ApiService(`patients/get-patient`);
  const router = useRouter();

  // sends a request on every page load with token, if it returns a 401, user will be logged out
  const { error } = useQuery({
    queryKey: ["ping"],
    queryFn: () => pingService.fetch(""),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  function logOutUnauthorizedUser() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    router.push("/auth/login");
  }

  // logs out user and deletes token stored in local storage
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      logOutUnauthorizedUser();
    }
  }

  /* gets the token and user object from local storage and 
  loads it into the user context on every page mount */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) router.push("/auth/login");

    if (token) {
      setToken(token);
    }
  }, []);

  return <>{children}</>;
}
