import { cookies } from 'next/headers';
import { GetSessionAndUserResult } from '../../../../packages/ui/src/sdk';

export async function getProfileFromServer(): Promise<GetSessionAndUserResult | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const res = await fetch(`${process.env.NEST_API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await res.json()) as GetSessionAndUserResult | null;
}
