export interface Prescription {
    data: {
        id: string;
        created_at: string;
        updated_at: string | null;
        medication: string;
        patient_id: string;
        dosage: string;
        duration: string;
        frequency: string;
        notes: string;
        service_provider_id: string;
        service_provider: string;
    }[];
}