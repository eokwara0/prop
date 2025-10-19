import './index.css';
import { redirect } from 'next/navigation';
import { TooltipProvider } from '@repo/ui/components/shadcn/ui/tooltip';
import { auth } from '@repo/ui/providers/auth.provider';
import { AppAuthContextProvider } from '@repo/ui/providers/app.auth.provider';
import {
  SideBar,
  SideBarInset,
  SideBarProvider,
} from '@repo/ui/components/sidebar/sidebar';
import { BottomNav } from '@repo/ui/components/sidebar/bottom-nav';
import { AppHeader } from '@repo/ui/components/sidebar/app-header';
import AppLogo from '../../assets/logo/icon.png';
import { getProfileFromServer } from '../../lib/auth/getserverprofile';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = (await getProfileFromServer())?.user.id
  if (userId) {
    return (
      <div className="min-h-dvh ">
        <AppAuthContextProvider data={userId}>
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
  redirect('/');
}
