'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLogo from '../../../assets/logo/icon2.png';
import Image from 'next/image';
import { UserType } from '../../../lib/types/types';
import { useBanner } from '../../../lib/components/banner/banner';
import SignupValidation, {
  PasswordField,
  SignupPasswordValidationProvider,
  SignupProvider,
  SignupStatus,
} from '../../../lib/components/signup/provider';
import Modal from '../../../lib/components/banner/modal';
import Loader from '../../../lib/components/loader/loader';

const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

export default function SignUpPage() {
  const [password, setPassword] = useState('');
  const { show } = useBanner();
  const router = useRouter();
  const [retype, setRetype] = useState('');
  const [status, setStatus] = useState<SignupStatus>(SignupStatus.INITIAL);

  const isValid =
    password.length > 0 &&
    password === retype &&
    strongPasswordRegex.test(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(SignupStatus.LOADING);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('signup_email') as string;
    const name = formData.get('signup_name') as string;
    if (isValid && email) {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            userType: UserType.Admin,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          show(
            <Modal
              firstMessage={data.data.error.message}
              secondMessage={data.data.message}
            />,
            'error',
          );
          setStatus(SignupStatus.ERROR);
        } else {
          setStatus(SignupStatus.SUCCESS);
          show(
            <Modal
              firstMessage="Account created successfully"
              secondMessage="You can now login"
            />,
            'success',
          );
          router.push('/login');
        }
      } catch (error) {
        console.error('Signup error:', error);
        setStatus(SignupStatus.ERROR);
      }
    } else {
      setStatus(SignupStatus.ERROR);
      console.error('Invalid form data');
    }
  };

  return (
    <SignupProvider>
      <SignupPasswordValidationProvider>
        {
          <div
            className={`min-h-[calc(100vh)] flex justify-center items-center bg-gradient-to-tr from-l_f_s to-l_f_f`}
          >
            <div className="w-full max-w-sm flex flex-col items-center p-4 gap-3 rounded-md">
              <form
                id="signup_form"
                name="signup_form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full"
              >
                {/* Logo */}
                <div className="flex flex-col items-start gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Image src={AppLogo} alt="logo" width={40} height={40} />
                    <p className="text-3xl text-white">Domio</p>
                  </div>
                </div>

                {/* {Name} */}
                <input
                  className="bg-gradient-to-tr from-login-form to-l_f_s placeholder:text-sm pl-3 text-gray-50 w-full border border-slate-50 rounded-md h-11"
                  placeholder="Name"
                  type="text"
                  name="signup_name"
                  id="signup_name"
                />
                {/* Email */}
                <input
                  disabled={status === SignupStatus.LOADING}
                  type="email"
                  id="signup_email"
                  name="signup_email"
                  placeholder="Email address"
                  className="bg-gradient-to-tr from-login-form to-l_f_s placeholder:text-sm pl-3 text-gray-50 w-full border border-slate-50 rounded-md h-11"
                  required
                />
                {/* Password */}
                <PasswordField action={setPassword} val={password} />
                <SignupValidation length={5} />
                {/* Retype password */}
                <input
                  type="password"
                  id="retypepass"
                  disabled={status === SignupStatus.LOADING}
                  value={retype}
                  onChange={(e) => setRetype(e.currentTarget.value)}
                  placeholder="Retype Password"
                  className="bg-gradient-to-tr from-login-form to-l_f_s placeholder:text-sm pl-3 text-gray-50 w-full border border-slate-50 rounded-md h-11"
                  required
                />
                {/* Continue */}
                <button
                  type="submit"
                  disabled={!isValid || status === SignupStatus.LOADING}
                  className={`h-10 rounded-md w-full ${
                    isValid
                      ? 'bg-button cursor-pointer'
                      : 'bg-slate-500 cursor-not-allowed'
                  }`}
                >
                  {status === SignupStatus.LOADING ? <Loader /> : 'Continue'}
                </button>
                {/* Login link */}
                <p className=" text-left text-white flex gap-1">
                  Already have an account?
                  <a href="/login" className="text-button font-light">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        }
      </SignupPasswordValidationProvider>
    </SignupProvider>
  );
}
