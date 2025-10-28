import { getDomio } from './domio';
const {
  authControllerGetProfile,
  authControllerGetUsers,
  authControllerLogin,
  authControllerSignup,
  authControllerGetUserId,
  propertyControllerCreate,
  propertyControllerGet,
  propertyControllerGetByOwner,
  propertyControllerGetOwnerStats,
  fileControllerUploadFile
} = getDomio();

export {
  authControllerGetProfile as getProfile,
  authControllerGetUsers as getUser,
  authControllerLogin as login,
  authControllerSignup as signup,
  authControllerGetUserId as getUserId,
  propertyControllerCreate as createProperty,
  propertyControllerGet as getPropertyById,
  propertyControllerGetByOwner as getOwnersProperty,
  propertyControllerGetOwnerStats as getPropertyStats,
  fileControllerUploadFile as uploadFile
  
};
export * from './domio';
