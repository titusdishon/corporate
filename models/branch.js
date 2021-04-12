import pkg from "mongoose";
const { model, Schema } = pkg;
const branchSchema = Schema({
  creatorId: {
    type: String,
    required: [true, "Required field missing"],
  },
  isActive: {
    type: Boolean,
    required: [true, "User status is required"],
  },
  corporateCode: {
    type: String,
  },
  dateOfActivation: {
    type: String,
  },
  branchName: {
    type: String,
    required: [true, "Please enter name of the branch "],
  },
  countyOrState: {
    type: String,
    required: [true, "Please enter county or state "],
    maxLength: [30, "County/Estate Name can not exceed 30 characters"],
  },
  cityOrTown: {
    type: String,
    required: [true, "Please enter city/town"],
    maxLength: [30, "City/Town Name can not exceed 30 characters"],
  },
  street: {
    type: String,
    required: [true, "Please enter street name"],
    maxLength: [30, "Street name can not exceed 30 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter a phone number"],
    maxLength: [13, "Phone number can not exceed 13 characters"],
  },
  numberOfEmployees: {
    type: Number,
    required: [true, "Please enter number of employees"],
  },
  dateCreated: {
    type: String,
  },
  dateModified: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  corporateName: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  activated: {
    type: Boolean,
  },
  activatedBy: {
    type: String,
  },

});

const branchModel = model("CorporateBranch", branchSchema,"CorporateBranches");

export default branchModel;
