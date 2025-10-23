import { cookies } from 'next/headers';
import { GetSessionAndUserResult } from '../../../../packages/ui/src/sdk';

export async function getProfileFromServer(): Promise<GetSessionAndUserResult | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    const res = await fetch(`${process.env.NEST_API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return (await res.json()) as GetSessionAndUserResult;
    }
    throw new Error('Failed to fetch profile');
  } catch (error) {
    return null;
    ``;
  }
}
