'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
} from 'react';

export interface SignupData {
  name: string;
  email: string;
  password: string;
  surname: string;
  cellphone: string;
  gender: string;
  address: string;
  DOB: Date;
}

export const enum SignupStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  INITIAL = 'initial',
  LOADING = 'loading',
}

export enum SignupContextAction {
  ADD = 'ADD',
  DELETE = 'DELETE',
}
export const SignupContext = createContext<SignupData>({} as SignupData);
export const SignupDispatchContext = createContext<
  React.Dispatch<{ type: SignupContextAction; value: SignupData }> | undefined
>(undefined);

export const SignupReducer = (
  state: SignupData,
  action: { type: SignupContextAction; value: SignupData },
) => {
  switch (action.type) {
    case SignupContextAction.ADD:
      return {
        ...state,
        numbers: { ...state, ...action.value },
      };
    case SignupContextAction.ADD:
      return {
        ...state,
      };
    default:
      throw new Error(`unknow action type : ${action.type}`);
  }
};

export type SignupPasswordValidationType = {
  numbers: Array<number>;
};
export const signupValidationContext =
  createContext<SignupPasswordValidationType>({
    numbers: [],
  });
export const signupDispatchContext = createContext<
  React.Dispatch<{ type: SignupPasswordActionType; num: number[] }> | undefined
>(undefined);

export enum SignupPasswordActionType {
  APPEND = 'append',
  DELETE = 'delete',
}

export const SignupPasswordReducer = (
  state: SignupPasswordValidationType,
  action: { type: SignupPasswordActionType; num: number[] },
) => {
  switch (action.type) {
    case SignupPasswordActionType.APPEND:
      return {
        ...state,
        numbers: [...action.num].sort(),
      };
    case SignupPasswordActionType.DELETE:
      return {
        ...state,
        numbers: state.numbers
          .filter((c) => {
            return c !== action.num.pop();
          })
          .sort((a, b) => a - b),
      };
    default:
      throw new Error(`unknow action type : ${action.type}`);
  }
};
export function PasswordField({
  action,
  val,
}: {
  action: Dispatch<SetStateAction<string>>;
  val: string;
}) {
  const validatepassword = (password: string): Array<number> => {
    const results = [
      /[A-Z]/.test(password), // 0: uppercase
      /[a-z]/.test(password), // 1: lowercase
      /\d/.test(password), // 2: digit
      password.length >= 8, // 3: length
      /\S$/.test(password), // 4: ends with non-whitespace
    ];

    // return indexes of passed checks
    return results
      .map((passed, index) => (passed ? index : -1))
      .filter((i) => i !== -1)
      .map((c, i) => i)
      .sort();
  };

  const sudc = useContext(signupDispatchContext);
  const sd = useContext(SignupDispatchContext);
  return (
    <>
      <div className="flex w-full">
        <input
          onChange={(e) => {
            const values = validatepassword(e.currentTarget.value);
            sudc!({ type: SignupPasswordActionType.APPEND, num: values });
            action(e.currentTarget.value);
            sd!({
              type: SignupContextAction.ADD,
              value: {
                password: e.currentTarget.value,
              } as SignupData,
            });
          }}
          name="signup_password"
          id="signup_password"
          type="password"
          value={val}
          placeholder="Password"
          pattern="^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$"
          className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s  pl-3 text-gray-50  w-full border border-slate-50 rounded-md h-11"
        />
      </div>
    </>
  );
}

export default function SignupValidation({ length }: { length: number }) {
  const { numbers } = useContext(signupValidationContext);

  // Decide color once per render
  let change_color = 'bg-white';
  if (numbers.length < 3) {
    change_color = 'bg-red-500';
  } else if (numbers.length < 5) {
    change_color = 'bg-amber-500';
  } else if (numbers.length == 5) {
    change_color = 'bg-green-500';
  } else {
    change_color = 'bg-white';
  }

  return (
    <div className="w-full flex gap-2 pt-3 pb-3 px-2">
      {Array.from({ length }, (_, k) => (
        <div
          key={k}
          className={`w-[25%] rounded h-0.5 ${
            numbers.includes(k) ? change_color : 'bg-white'
          }`}
        />
      ))}
    </div>
  );
}
export function SignupPasswordValidationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(SignupPasswordReducer, {
    numbers: [],
  });
  return (
    <signupDispatchContext.Provider value={dispatch}>
      <signupValidationContext.Provider value={state}>
        {children}
      </signupValidationContext.Provider>
    </signupDispatchContext.Provider>
  );
}

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(SignupReducer, {
    name: '',
    email: '',
    password: '',
    address: '',
    cellphone: '',
    DOB: new Date(Date.now()),
    gender: '',
    surname: '',
  });

  return (
    <SignupDispatchContext.Provider value={dispatch}>
      <SignupContext.Provider value={state}>{children}</SignupContext.Provider>
    </SignupDispatchContext.Provider>
  );
}
