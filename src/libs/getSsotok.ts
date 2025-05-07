import { cookies } from "next/headers";

export const getSsotok =  async () => {
  return  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SSOTOK
    :  (await cookies()).get("ssotok")?.value;
};
