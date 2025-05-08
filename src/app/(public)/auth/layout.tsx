import ApiResponse from "@/interfaces/api-response";
import { UserResponse } from "@/interfaces/user/user-response";
import UserProvider from "@/provider/user-context";
import { Me } from "./actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await Me();

  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider user={user as ApiResponse<UserResponse>}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
