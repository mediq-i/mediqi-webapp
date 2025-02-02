import ApiService from "./utils/api-service";
import { UserProfile } from "./types/UserAdapterTypes";
import TanstackWrapper from "./utils/tanstack-wrapper";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";

// api service initilizer
const userService = new ApiService("patients/");
const useUserMutation = TanstackWrapper.mutation;
const useUserQuery = TanstackWrapper.query;

const UserAdapter = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserProfile: async (params: string | null): Promise<any> => {
    const response = await userService.fetch<UserProfile>(`get-patient/${params}`);

    return response;
  },

  editUserProfile: async ({ payload }: MutationCallBackArgs<UserProfile>) => {
    const response = await userService.mutate<UserProfile, UserProfile>({
      slug: `profile/edit`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

export { UserAdapter, useUserMutation, useUserQuery };
