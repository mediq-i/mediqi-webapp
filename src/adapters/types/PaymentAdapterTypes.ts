export type CreatePaymentIntent = {

  patientId: string | undefined,
  providerId: string | null,
  appointmentId: string | undefined,
  amount: number,
  currency: string,
  description: string

}