import validator from "validator";
import pkg from "mongoose";
const { model, Schema } = pkg;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name can not exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phoneNumber"],
    unique: true,
    minLength: [10, "Please enter a valid phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: true,
  },
  corporate: {
    type: String,
    required: [true, "Corporate field is required"],
  },
  branch: {
    type: String,
    required: [true, "Branch field is required"],
  },
  avatar: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  roles: {
    type: [String],
    default: ["BRANCH"],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  activatedBy: {
    type: String,
  },
  activatorId:{
    type: String,
  },
  creatorId:{
    type: String,
  },
  activatedAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

const userModel = model("CorporateUser", userSchema,"CorporateUsers");

export default userModel;
