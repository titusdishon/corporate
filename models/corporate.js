import validator from "validator";
import pkg from "mongoose";
const { model, Schema } = pkg;
const corporateSchema = Schema({

  DisplayName: {
    type: String,
    required: [true, "Required field missing"],
  },

  LegalOrTradingName: {
    type: String,
    required: [true, "Required field missing"],
  },
  RegistrationNumber: {
    type: String,
    required: [true, "Required field missing"],
  },
  RegistrationDate: {
    type: String,
    required: [true, "Required field missing"],
  },
  CompanyCode: {
    type: String,
    required: [true, "Required field missing"],
  },
  CountyOrState: {
    type: String,
    required: [true, "Required field missing"],
  },
  PostalCode: {
    type: String,
    required: [true, "Required field missing"],
  },
  PostalAddress: {
    type: String,
    required: [true, "Required field missing"],
  },
  CityOrTown: {
    type: String,
    required: [true, "Required field missing"],
  },
  Street: {
    type: String,
    required: [true, "Required field missing"],
  },
  BuildingNameOrNumber: {
    type: String,
    required: [true, "Please enter a phone number"],
    maxLength: [13, "Phone number can not exceed 13 characters"],
  },
  NumberOfEmployees: {
    type: Number,
    required: [true, "Please enter number of employees"],
  },

  PrimaryPhoneNumber: {
    type: String,
    required: [true, "Please enter number of employees"],
  },
  SecondaryPhoneNumber: {
    type: String,
    required: [true, "Please enter number of employees"],
  },
  buildingNameOrNumber: {
    type: String,
    required: [true, "Please enter a phone number"],
    maxLength: [13, "Phone number can not exceed 13 characters"],
  },
  EmailAddress: {
    type: String,
    required: [true, "Please enter number of employees"],
  },

  Website: {
    type: String,
    required: [true, "Please enter number of employees"],
  },
  ActivatedBy: {
    type: String,
  },

  Activated: {
    type: String,
  },

  IsActive: {
    type: Boolean,
  },

  CreatedBy: {
    type: String,
  },

  DateModified: {
    type: String,
  },

  DateCreated: {
    type: String,
  },

  AreaCode: {
    type: String,
  },
  
});

const corporateModel = model("Corporate", corporateSchema, "Corporate");

export default corporateModel;
