import { Helix_ } from '../../../lib/components/loader/loader';

export default async function Page() {
  //console.log('session.user:', session?.user as IUser);
  return (
    <>
      <div className=" min-h-full flex-col gap-2 bg-gradient-to-tr from-l_f_s to-l_f_f  flex justify-center items-center">
        <Helix_ />
      </div>
    </>
  );
}
