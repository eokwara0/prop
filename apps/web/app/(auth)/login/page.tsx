'use client';
import AppLogo from '../../../assets/logo/icon2.png';
import Image from 'next/image';
import { FormEvent, startTransition, useTransition } from 'react';
import Loader from '@repo/ui/components/loader/loader';
import { login } from '../../../../../packages/ui/src';

export default function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const formdata = new FormData(e.currentTarget);
      const cc = await login({
        email: formdata.get('email') as string,
        password: formdata.get('password') as string,
      });
      console.log(cc);
    });
  };
  return (
    <div className=" min-h-screen justify-center items-center content-center flex flex-col gap-2 bg-gradient-to-tr from-l_f_s to-l_f_f">
      <div className="justify-center items-center content-center  h-full flex flex-col gap-2 ">
        <div className=" transition-all  duration-75 w-full max-sm:w-full max-sm:h-[auto]  h-[auto] justify-between  flex flex-col rounded-md p-4 gap-3">
          <form className=" flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
            <div className="h-[100%] flex flex-col items-left">
              <label className=" mb-6">
                <div className="flex  gap-3 justify-start items-center">
                  <Image
                    src={AppLogo}
                    alt={'app logo'}
                    width={50}
                    height={50}
                  />
                  <p className="text-xl ">Domio</p>
                </div>
              </label>
              <label htmlFor="email" className="mb-5">
                <input
                  name="email"
                  id="email"
                  placeholder="Email or username"
                  className="bg-gradient-to-tr placeholder:text-sm placeholder:p-2 from-login-form to-l_f_s pl-3 text-muted  w-full border border-slate-50 rounded-md h-11"
                />
              </label>
              <label htmlFor="password" className="mb-5">
                <input
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gradient-to-tr placeholder:text-sm placeholder:p-2 from-login-form to-l_f_s  pl-3 text-muted  w-full border border-slate-50 rounded-md h-11"
                />
              </label>
            </div>

            {!isPending ? (
              <input
                type="submit"
                value="Sign In"
                className=" hover:scale-[101%] transition-all cursor-pointer   align-bottom h-10 p-2 rounded-md  w-full bg-button "
              />
            ) : (
              <div className="transition-all cursor-pointer flex justify-center   align-bottom h-10 p-2 rounded-md  w-full bg-button">
                <Loader />
              </div>
            )}

            <div className="text-[0.7rem] flex flex-col  gap mt-3">
              <div className=" w-full flex justify-start text-button">
                <a href="" className="text-sm">
                  Forgot password ?
                </a>
              </div>
              <div className="flex gap-2 text-[0.9rem]">
                <p className=" font-extralight">Don&apos;t have an account?</p>{' '}
                <span>
                  <a href="/signup" className=" border-b-white text-button ">
                    Sign up
                  </a>
                </span>
              </div>
            </div>
          </form>
        </div>
        {/* <LoginInfoPage length={7} /> */}
      </div>
      <div className="p-3 text-xs">
        <p>© 2025. All rights reserved.</p>
      </div>
    </div>
  );
}
