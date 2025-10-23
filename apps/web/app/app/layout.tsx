import './index.css';
import { redirect } from 'next/navigation';
import { TooltipProvider } from '@repo/ui/components/shadcn/ui/tooltip';
import AppLogo from '../../assets/icon.png';
import { getProfileFromServer } from '../../lib/auth/getserverprofile';
import { AppAuthContextProvider } from '../../lib/providers/app.auth.provider';
import { SideBar, SideBarInset, SideBarProvider } from '../../lib/components/sidebar/sidebar';
import { AppHeader } from '../../lib/components/sidebar/app-header';
import { BottomNav } from '../../lib/components/sidebar/bottom-nav';

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
            <TooltipProvider delayDuration={0} data-slot="tooltip-provider">
              <SideBar logo={AppLogo} />
              <SideBarInset>
                <AppHeader />
                <div className=" h-[94.5%] max-md:min-h-[100%] overflow-y-auto scrollbar-hidden">
                  {children}
                </div>
                <BottomNav></BottomNav>
              </SideBarInset>
            </TooltipProvider>
          </SideBarProvider>
        </AppAuthContextProvider>
      </div>
    );
  }
  return redirect('/login');
}
