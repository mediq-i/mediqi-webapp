import ApiService from "./utils/api-service";
import { UserProfile } from "./types/UserAdapterTypes";
import TanstackWrapper from "./utils/tanstack-wrapper";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";

// api service initilizer
const userService = new ApiService("protected/user");
const useUserMutation = TanstackWrapper.mutation;
const useUserQuery = TanstackWrapper.query;

const UserAdapter = {
  getUserProfile: async (params: string | undefined): Promise<UserProfile> => {
    const response = await userService.fetch<UserProfile>(`/profile/${params}`);

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
