// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getErrorMessage(error: any): string {
  return error?.response?.data?.message;
}
