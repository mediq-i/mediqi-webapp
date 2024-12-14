import ApiService from "./utils/api-service";
import { UserProfile } from "./types/UserAdapterTypes";
import { tanstackWrapper } from "./utils/tanstack-wrapper";
import { MutationCallBackArgs } from "./types/TanstackUtilTypes";

// api service initilizer
const userService = new ApiService("protected/user");
const useUserMutation = tanstackWrapper.mutation;
const useUserQuery = tanstackWrapper.query;

const UserAdapter = {
  getUserProfile: async (_params: string | undefined): Promise<UserProfile> => {
    const response = await userService.fetch<UserProfile>(`/profile`);

    return response;
  },

  editUserProfile: async ({ payload }: MutationCallBackArgs<UserProfile>) => {
    const response = await userService.mutate<UserProfile, {}>({
      slug: `profile/edit`,
      payload,
      type: "JSON",
      method: "POST",
    });
    return response;
  },
};

export { UserAdapter, useUserMutation, useUserQuery };
