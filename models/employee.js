import validator from "validator";
import pkg from "mongoose";
const { model, Schema } = pkg;

const employeeSchema = new Schema({
  employeeName: {
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
  walletBalance: {
    type: Number,
  },
  riderCode: {
    type: String,
    unique: true,
    required: [true, "Please enter a rider code"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: true,
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
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  selfApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  branch: {
    type: String,
  },
  corporate: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  createdBy: {
    user: {
      id: String,
      email: String,
    },
  },
  activated: {
    type: String,
  },
  updatedAt: {
    type: String,
    default: Date.now(),
  },
});

const employeeModel = model(
  "CorporateEmployee",
  employeeSchema,
  "CorporateEmployees"
);

export default employeeModel;
