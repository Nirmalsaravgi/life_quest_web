// src/app/api/profiles/life-areas/route.ts
import { NextResponse } from 'next/server';
import { apiClient } from '@/core/api/client';
import { LifeArea } from '@/modules/profile/types';
import { AxiosError } from 'axios';

export async function GET() {
  try {
    const response = await apiClient.get<LifeArea[]>('/profiles/life-areas');
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('API /profiles/life-areas error:', error);
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
