import ApiService from "./utils/api-service";
import { User } from "./types/UserAdapterTypes";
import TanstackWrapper from "./utils/tanstack-wrapper";

// api service initilizer
const userService = new ApiService("patients/");
const useUserMutation = TanstackWrapper.mutation;
const useUserQuery = TanstackWrapper.query;

const UserAdapter = {
  getUserProfile: async (): Promise<User> => {
    const response = await userService.fetch<User>(`get-patient`);

    return response;
  },
};

export { UserAdapter, useUserMutation, useUserQuery };
