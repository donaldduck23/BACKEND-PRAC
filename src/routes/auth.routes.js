import { Router } from "express";
import {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgotPasswordValidator,
} from "../validator/index.js";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validator.middleware.js"; 
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Initial Routes without middelwere 
// router.route("/register").post(registerUser);
//With Middlewere 


//Unsecured Routes 
router.route("/register").post(userRegisterValidator(),validate,registerUser);
router.route("/login").post(userLoginValidator(),validate,login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

//Secure Protected Routes 
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );
router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

export default router;

