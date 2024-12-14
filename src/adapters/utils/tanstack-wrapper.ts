import {
  MutationCallBackArgs,
  QueryCallBackArgs,
} from "../types/TanstackUtilTypes";
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

class TanstackWrapper {
  private static instance: TanstackWrapper;
  private constructor() {}

  public static getInstance() {
    if (!TanstackWrapper.instance) {
      TanstackWrapper.instance = new TanstackWrapper();
    }
    return TanstackWrapper.instance;
  }

  // mutation utility
  mutation<TData, TVariables, TError = unknown, TContext = unknown>({
    mutationCallback,
    params,
  }: {
    mutationCallback: ({
      payload,
      params,
    }: MutationCallBackArgs<TVariables>) => Promise<TData>;
    params?: string;
  }): UseMutationResult<TData, TError, TVariables, TContext> {
    return useMutation<TData, TError, TVariables, TContext>({
      mutationFn: (payload: TVariables) =>
        mutationCallback({ payload, params }),
    });
  }

  // query utility
  query<B>({ queryCallback, queryKey, slug }: QueryCallBackArgs<B>) {
    return useQuery({
      queryKey: queryKey,
      queryFn: () => queryCallback(slug),
    });
  }
}

export const tanstackWrapper = TanstackWrapper.getInstance();
