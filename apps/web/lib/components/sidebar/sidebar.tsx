'use client';
import {
  Arrow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import {  LogOut, LucideProps, PanelLeft, Settings } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React, { useCallback, useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from './use-mobile';
import { NavDrawer } from './nav.drawer';
import { AuthProviderContext } from '../../providers/app.auth.provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/lib/shadcn/components/ui/dropdown-menu';

const SIDEBAR_WIDTH = '3rem';

type SideBarContextType = {
  open: boolean;
  toggleSideBar: () => void;
  setOpen: (open: boolean) => void;
};

const SideBarContext = createContext<SideBarContextType | null>(null);

const useSideBarContext = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("Please use this hook inside of it's provider");
  }
  return context;
};

export function SideBarProvider({
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const toggle = React.useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const contextValue = React.useMemo<SideBarContextType>(() => {
    return {
      open: open,
      setOpen: setOpen,
      toggleSideBar: toggle,
    };
  }, [open, toggle, setOpen]);
  return (
    <SideBarContext.Provider value={contextValue} {...props}>
      <div className={`flex  min-h-full  ${className}`}>{children}</div>
    </SideBarContext.Provider>
  );
}

export function SideBarTrigger() {
  const { toggleSideBar } = useSideBarContext();

  return (
    <div onClick={toggleSideBar}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild className="p-1 cursor-pointer">
          <div className="h-6 flex justify-center items-center hover:bg-l-c bg-button rounded">
            <PanelLeft size={15} />
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={20} align={'start'}>
          <Arrow />
          <p className=" rounded-md text-xs bg-button px-2 py-1 w-fit h-fit">
            Close panel
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export type SideBarDataType = {
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
  active: boolean;
};

export function SideBar({ logo }: { logo: StaticImageData }) {
  const isMobile = useIsMobile();
  const { open } = useSideBarContext();
  const appAuthData = useContext(AuthProviderContext);

  const [data, setData] = useState<SideBarDataType[]>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    appAuthData?.sideBarData!,
  );

  const onSideClick = useCallback(
    (sidebarcontext: SideBarDataType) => {
      setData(
        data.map((c) => {
          if (c.name === sidebarcontext.name) {
            localStorage.setItem('side-bar', JSON.stringify(sidebarcontext));
            return sidebarcontext;
          }
          return {
            ...c,
            active: false,
          };
        }),
      );
    },
    [data],
  );

  useEffect(() => {
    const savedData = localStorage.getItem('side-bar');
    console.log(savedData);
    if (savedData) {
      const op = JSON.parse(savedData) as SideBarDataType;
      setData(
        data.map((x) => {
          if (x.name === op.name) {
            return {
              ...x,
              active: true,
            };
          }
          return x;
        }),
      );
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="hidden max-md:flex max-md:justify-center max-md:items-center self-center">
          <NavDrawer sdata={data} />
        </div>
      ) : (
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  className={` border-r-[1px] border-r-gray-500 flex flex-col justify-between items-center min-h-screen transition-all duration-100 bg-gradient-to-br from-l_f_s to-l_f_f w-[${SIDEBAR_WIDTH}]`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <SideBarPanel>
                      <SideBarHeader image={logo} />
                    </SideBarPanel>
                    <div className="flex flex-col gap-2">
                      {data.map((da) => (
                        <SideBarPanel key={da.name} active={da.active}>
                          <Tooltip>
                            <TooltipTrigger>
                              {
                                <Link
                                  className={`cursor-pointer`}
                                  href={da.href}
                                  onClick={() =>
                                    onSideClick({
                                      ...da,
                                      active: true,
                                    })
                                  }
                                >
                                  <da.icon size={'1.3rem'} />
                                </Link>
                              }
                            </TooltipTrigger>
                            <TooltipContent
                              className="bg-button p-2 rounded-md"
                              side="right"
                              sideOffset={20}
                            >
                              <Arrow
                                width={10}
                                height={5}
                                className=" fill-button"
                              />
                              <p className="text-xs">{da.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </SideBarPanel>
                      ))}
                    </div>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className='mb-5'>
                        <Settings className="cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        hideWhenDetached={true}
                        align="end"
                        alignOffset={2}
                        className=" flex flex-col gap-3 p-1 rounded-md w-48   #shadow border-2 border-bc backdrop-blur-xs bg-gradient-to-r from-pp-s to-pp-s"
                        side="right"
                        sideOffset={20}
                      >
                        <DropdownMenuItem
                          className="outline-none p-1 text-[1rem] rounded cursor-pointer hover:bg-button flex gap-2 justify-start items-center"
                          onClick={() => {}}
                        >
                          <LogOut width={15} height={15} />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export function SideBarPanel({
  children,
  className,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <>
      <div
        onClick={onClick}
        className={` rounded-md p-1 ${
          active ? 'bg-button' : 'hover:bg-d-background'
        } w-fit flex justify-center items-center  ${className}`}
      >
        {children}
      </div>
    </>
  );
}

export function SideBarHeader({
  height,
  width,
  image,
}: {
  height?: number;
  width?: number;
  image?: StaticImageData;
}) {
  return (
    <div className="rounded-md p-2">
      <Image
        src={image ?? ''}
        width={width ?? 70}
        height={height ?? 70}
        alt=""
      />
    </div>
  );
}

export function SideBarInset({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full min-h-svh">{children}</div>
    </>
  );
}

export { useSideBarContext };
