export type BookAppointment = {
appointment_date: Date | undefined;
patient_symptoms: string[];
patient_ailment_description: string;
patient_symptom_duration: string;
status: string;
service_provider_id: string | null;
}