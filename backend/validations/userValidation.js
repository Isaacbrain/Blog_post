import Joi from "joi";

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(40).required(),

    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),

    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const validation = schema.validate(req.body);
  const { error } = validation;
  if (error) {
    return res.status(403).json({ message: "invalid input" });
  }
  next();
};
export default userValidation;
