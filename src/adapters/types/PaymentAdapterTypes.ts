export type CreatePaymentIntent = {
  patientId: string | undefined;
  providerId: string | null;
  appointmentId: string | undefined;
  amount: number;
  currency: string;
  description: string;
};

export type VerifyPaymentPayload = {
  reference: string;
};
