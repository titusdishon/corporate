import pkg from "mongoose";
const { model, Schema } = pkg;

const budgetSchema = new Schema({
  corporate: {
    type: String,
  },
  branch: {
    type: String,
  },
  amount: {
    type: Int,
  },
  startingDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
  isActive: {
      type: Boolean,
      default: true,
  },
  startingDate: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    user: {
      id: String,
      email: String,
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const budgetModel = model(
  "CorporateBudget",
  budgetSchema,
  "CorporateBudget"
);

export default budgetModel;
