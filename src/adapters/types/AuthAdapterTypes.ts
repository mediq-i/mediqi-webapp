import { User, Session } from "@/lib/types/user";

export type SignUpPayload = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  auth_id: string;
  message: string;
};

export type VerifyEmailAuthPayload = {
  firstName: string;
  lastName: string;
  email: string;
  auth_id: string;
  otp: string;
  userType: string;
};

export type VerifyEmailAuthResponse = {
  user: User;
  session: Session;
};

export type CreatePatientPayload = {
  firstName: string;
  lastName: string;
  email: string;
  authId: string;
};
export type LoginPayload = {  
  password: string;
  email: string;
};
