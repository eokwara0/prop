import { getDomio } from './domio';
const {
  authControllerGetProfile,
  authControllerGetUsers,
  authControllerLogin,
  authControllerSignup,
} = getDomio();

export {
  authControllerGetProfile as getProfile,
  authControllerGetUsers as getUser,
  authControllerLogin as login,
  authControllerSignup as signup,
};
export * from './domio';
