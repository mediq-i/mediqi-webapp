import ApiService from "./utils/api-service";
import TanstackWrapper from "./utils/tanstack-wrapper";

// api service initilizer
const userService = new ApiService("service-providers/");
const useUserMutation = TanstackWrapper.mutation;
const useUserQuery = TanstackWrapper.query;

const ServiceProviderAdapter = {
  searchServiceProvider: async ({
    specialty,
    languages,
    rating,
  }: {
    specialty: string | null;
    languages: string[] | undefined;
    rating: string | null;
  }): Promise<any> => {
    const response = await userService.fetch<any>(
      `search?specialty=${specialty}&languages=${languages}&rating=${rating}`
    );

    return response;
  },

  getServiceProviderDetails: async ({
    id
  }: {
    id: string | null;
  }): Promise<any> => {
    const response = await userService.fetch<any>(
      `get-service-provider/${id}`
    );

    return response;
  },
};

export { ServiceProviderAdapter, useUserMutation, useUserQuery };
