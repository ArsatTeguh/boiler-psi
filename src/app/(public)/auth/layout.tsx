import ApiResponse from "@/interfaces/api-response";
import { UserResponse } from "@/interfaces/user/user-response";
import UserProvider from "@/provider/user-context";
import { Me } from "./actions";
import Sidebar from "@/components/layout/sidebar";

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
          <div className="w-[calc(100%-16rem)] ml-auto p-4 min-h-screen ">
          <Sidebar />
          {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
