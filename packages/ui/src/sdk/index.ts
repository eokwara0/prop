import { getDomio } from './domio';
const {
  authControllerGetProfile,
  authControllerGetUsers,
  authControllerLogin,
  authControllerSignup,
  authControllerGetUserId
} = getDomio();

export {
  authControllerGetProfile as getProfile,
  authControllerGetUsers as getUser,
  authControllerLogin as login,
  authControllerSignup as signup,
  authControllerGetUserId as getUserId
};
export * from './domio';
