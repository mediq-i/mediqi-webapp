/* eslint-disable @typescript-eslint/no-explicit-any */

import { Prescription } from "./types/PrescriptionTypes";
import ApiService from "./utils/api-service";
import TanstackWrapper from "./utils/tanstack-wrapper";

// api service initilizer
const prescriptionsService = new ApiService("prescriptions/");
const usePrescriptionsMutation = TanstackWrapper.mutation;
const usePrescriptionsQuery = TanstackWrapper.query;

const prescriptionsAdapter = {
  getPrescriptions: async (id: string | undefined): Promise<Prescription> => {
    const response = await prescriptionsService.fetch<Prescription>(
      `patient/${id}`
    );

    return response;
  },
};

export { prescriptionsAdapter, usePrescriptionsMutation, usePrescriptionsQuery };
