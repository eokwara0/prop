'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { GetSessionAndUserResult } from '../../../../packages/ui/src/sdk';

export type SessionProviderContext = {
  data: GetSessionAndUserResult | null;
  auth: () => GetSessionAndUserResult | null;
};

const sessionProviderContext = createContext<SessionProviderContext | null>(
  null,
);

const useSession = () => {
  const context = useContext(sessionProviderContext);
  if (!context) {
    throw new Error('please use inside of the valid provider');
  }
};

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: GetSessionAndUserResult | null;
}) {
  const [data, setData] = useState<GetSessionAndUserResult | null>(session);
  const auth = useCallback(() => data, [data]);

  return (
    <sessionProviderContext.Provider value={{ auth , data }}>
      {children}
    </sessionProviderContext.Provider>
  );
}

export function auth()  {
    const sessionContextData = useContext(sessionProviderContext);
    if(!sessionContextData){
        return undefined
    }
    return sessionContextData.data;
}
