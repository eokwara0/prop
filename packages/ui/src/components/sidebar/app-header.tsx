'use client';
import { Search } from 'lucide-react';
import { SideBarTrigger } from './sidebar';
import { Avatar, AvatarFallback } from '../shadcn/ui/avatar';
import { Badge } from '../shadcn/ui/badge';

export function AppHeader() {
  return (
    <div className=" shadow bg-gradient-to-r border-b border-b-slate-400 from-l_f_s to-l_f_f p-1 w-full h-fit flex justify-between items-center">
      <div>
        <div className="flex gap-3 justify-center items-center">
          <SideBarTrigger />
          <Badge className="bg-button">Dashboard</Badge>
        </div>
      </div>
      <div className="max-sm:hidden w-[35%]">
        <div>
          <form action="" className="w-full">
            <label
              htmlFor="search"
              className="flex w-[90%] h-6 px-2 gap-2 items-center gap border border-slate-300 rounded-full"
            >
              <Search size={17} className="cursor-pointer" />
              <input
                type="text"
                name="search"
                id="search"
                placeholder="What would you like to do today?"
                className=" placeholder:bg-transparent placeholder:text-[0.8rem] placeholder:text-left placeholder:text-slate-300 w-full text-sm h-full outline-none"
              />
              <div className="flex gap-1">
                <div className="flex justify-center items-center rounded size-4 border border-slate-100 text-center p-2">
                  <p className="text-xs">≊</p>
                </div>
                <p className="text-xs">+</p>
                <div className="flex justify-center items-center rounded size-4 border border-slate-100 text-center p-2">
                  <p className="text-xs">/</p>
                </div>
              </div>
            </label>
          </form>
        </div>
      </div>
      <div>
        <Avatar className="size-6 bg-transparent">
          <AvatarFallback className="text-xs  bg-transparent border-amber-50 border-2">
            E
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
