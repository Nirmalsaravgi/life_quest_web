// src/app/api/users/me/route.ts
import { NextResponse } from 'next/server';
import { getAuthTokens } from '@/modules/auth/actions';
import { apiClient } from '@/core/api/client';
import { User } from '@/modules/user/types';
import { AxiosError } from 'axios';

export async function GET() {
  try {
    const { access } = await getAuthTokens();

    if (!access) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    // TODO: Add token refresh logic here if the access token is expired.

    const response = await apiClient.get<User>('/users/me', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('API /users/me error:', error);
    if (error instanceof AxiosError) {
      return new NextResponse(
        JSON.stringify({ message: error.response?.data?.message || 'Internal Server Error' }),
        { status: error.response?.status || 500 },
      );
    }
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 },
    );
  }
}
