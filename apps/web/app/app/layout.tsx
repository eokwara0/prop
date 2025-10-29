// import './index.css';
import { redirect } from 'next/navigation';
import AppLogo from '../../assets/icon.png';
import { getProfileFromServer } from '../../lib/auth/getserverprofile';
import { AppAuthContextProvider } from '../../lib/providers/app.auth.provider';
import {
  SideBar,
  SideBarInset,
  SideBarProvider,
} from '../../lib/components/sidebar/sidebar';
import { AppHeader } from '../../lib/components/sidebar/app-header';
import { BottomNav } from '../../lib/components/sidebar/bottom-nav';
export const dynamic = 'force-dynamic';
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getProfileFromServer();
  if (session != null) {
    return (
      <div className="min-h-dvh ">
        <AppAuthContextProvider data={session.user.id}>
          <SideBarProvider>
            <SideBar logo={AppLogo} />
            <SideBarInset>
              <AppHeader />
              <div className=" h-[94.6vh] max-md:min-h-[100vh] overflow-y-scroll scrollbar-hidden">
                {children}
              </div>
              <BottomNav></BottomNav>
            </SideBarInset>
          </SideBarProvider>
        </AppAuthContextProvider>
      </div>
    );
  }
  return redirect('/login');
}
