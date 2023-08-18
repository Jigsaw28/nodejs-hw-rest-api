const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().pattern(emailRegexp).required(),
      password: Joi.string().min(6).required(),
      subscription: Joi.string(),
      token: Joi.string(),
    })
    .validate(data);

const loginSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().pattern(emailRegexp).required(),
      password: Joi.string().min(6).required(),
    })
    .validate(data);

const emailSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().pattern(emailRegexp).required(),
    })
    .validate(data);

const updateSubscribeSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      subscription: Joi.string().valid("starter", "pro", "business").required(),
    })
    .validate(data);

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscribeSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
