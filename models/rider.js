import pkg from "mongoose";
const { model, Schema } = pkg;

const riderSchema = new Schema({
  UserName: { type: String },
  Name: { type: String },
  NormalizedUserName: { type: String },
  Email: { type: String },
  NormalizedEmail: { type: String },
  EmailConfirmed: { type: String },
  PhoneNumber: { type: String },
  PhoneNumberConfirmed: { type: Boolean },
  UserProfileFileTypes: { type: Object },
  AreaCode: { type: String },
});

const riderModel = model(
  "PassengerIdentityModels",
  riderSchema,
  "PassengerIdentityModels"
);

export default riderModel;
