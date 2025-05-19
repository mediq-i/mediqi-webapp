/* eslint-disable @typescript-eslint/no-explicit-any */

import { MutationCallBackArgs } from "./types/TanstackUtilTypes";
import ApiService from "./utils/api-service";
import TanstackWrapper from "./utils/tanstack-wrapper";

// api service initializer
const vitalsService = new ApiService("vitals/");
const useVitalsMutation = TanstackWrapper.mutation;
const useVitalsQuery = TanstackWrapper.query;

interface VitalsData {
  blood_pressure?: string;
  heart_rate?: string;
  sugar_level?: string;
  temperature?: string;
}

interface VitalsResponse {
  data: {
    id: string;
    date: string;
    blood_pressure: string;
    heart_rate: string;
    sugar_level: string;
    temperature: string;
    patient_id: string;
    created_at: string;
    updated_at: string;
  }[];
}

const VitalsAdapter = {
  addVital: async ({ payload }: MutationCallBackArgs<VitalsData>) => {
    const response = await vitalsService.mutate<VitalsData, unknown>({
      slug: "",
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },

  deleteVital: async ({ params }: MutationCallBackArgs<null>) => {
    await vitalsService.mutate<null, void>({
      slug: params,
      payload: null,
      type: "JSON",
      method: "DELETE",
    });
  },

  getPatientVitals: async (patientId: string): Promise<VitalsResponse> => {
    const response = await vitalsService.fetch<VitalsResponse>(
      `patient/${patientId}`
    );
    return response;
  },
};

export { VitalsAdapter, useVitalsMutation, useVitalsQuery };
