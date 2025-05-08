import { NextResponse } from "next/server";
import { UserResponse } from "@/interfaces/user/user-response";
import mockUsers from "@/interfaces/user/mock-user";

export async function POST(request: Request) {
  try {
    const user: { email: string } = await request.json();

    const response = mockUsers.filter(
      (users: UserResponse) => users.email === user.email
    );

    if (response.length <= 0) {
      return NextResponse.json(
        {
          message: "Login Failed",
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Login Success",
        data: response,
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = mockUsers.filter(
      (users: UserResponse) => users.email === "budi.santoso@company.com"
    );

    return NextResponse.json(
      {
        message: "Success",
        data: response[0],
      },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message },
      { status: 500 }
    );
  }
}
