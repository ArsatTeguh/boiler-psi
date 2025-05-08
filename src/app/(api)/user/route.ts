import { NextResponse } from 'next/server';
import { UserResponse } from '@/interfaces/user/user-response';
import mockUsers from '@/interfaces/user/mock-user';

export async function POST(request: Request) {
  try {
    const user: { email: string } = await request.json();

    const response = mockUsers.filter((users:UserResponse ) => users.email === user.email)

    return NextResponse.json(
      {
        message: 'Login Success',
        data: response,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error?.message },
      { status: 500 },
    );
  }
}
