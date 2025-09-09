import { body } from "express-validator";

const userRegisterValidator = ()=>{
    return [
        body("email")
            .trim() 
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()  
            .withMessage("Email is Invalid"),
        body("username")
            .trim()
            .notEmpty() 
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("username is required")
            .isLength({min : 3})
            .withMessage("Username must have atleast 3 character "),
         body("password")  
            .trim()
            .notEmpty()
            .withMessage("Password is req "),
        body("fullName")
            .optional()
            .trim()
    ];
}

const userLoginValidator  = ()=>{
    return[
    body("email")
    .optional()
    .isEmail()
    .withMessage("Email is invalid"),
     body("password")
    .optional()
    .notEmpty()
    .withMessage("Password is required")
    ] ; 
}; 

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [body("newPassword")
    .notEmpty()
    .withMessage("Password is required")];
};

const createProjectValidator = () => {
  return [
    body("name")
    .notEmpty()
    .withMessage("Name is required"),
    body("description").optional(),
  ];
};

const addMembertoProjectValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableUserRole)
      .withMessage("Role is invalid"),
  ];
};
export {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator,
    createProjectValidator,
    addMembertoProjectValidator
}