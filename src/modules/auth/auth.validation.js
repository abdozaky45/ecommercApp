import joi from "joi";
export const register = joi
  .object({
    userName: joi.string().alphanum().min(3).max(20).required(),
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net", "org", "edue", "gov", "mil", "edu", "eg"],
        },
      })
      .required(),
    password: joi.string().pattern(RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
    gender: joi.string().valid("male", "female", "not specified").required(),
    phone: joi.string().min(11).max(11).required(),
  })
  .required();
export const activationCode = joi
  .object({
    activationCode: joi.string().required(),
  })
  .required();
export const login = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net", "org", "edue", "gov", "mil", "edu", "eg"],
        },
      })
      .required(),
    password: joi.string().pattern(RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  })
  .required();
export const forgetPass = joi
  .object({
    email: joi
      .string()
      .email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: {
          allow: ["com", "net", "org", "edue", "gov", "mil", "edu", "eg"],
        },
      })
      .required(),
  })
  .required();
export const resetPass = joi
  .object({
    forgetCode: joi.string().required(),
    password: joi.string().pattern(RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
  })
  .required();
