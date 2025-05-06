import { redirect } from "next/navigation";
import { SSOAuthentication } from "../../../../libs/auth";

export default async function RootLayout() {
  await SSOAuthentication();
  redirect("/");
  return null;
}
