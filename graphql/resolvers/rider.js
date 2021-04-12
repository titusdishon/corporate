import riderModel from "../../models/rider.js";
import { authenthenticate } from "../../middleWares/authentication.js";

const riderResolver = {
  Query: {
    //Get an existing rider to add as an employee
    async getRider(_, { phoneNumber }, context) {
      authenthenticate(context);
      try {
        const rider = await riderModel.findOne({PhoneNumber:phoneNumber.trim()});
        return rider;
      } catch(err) {
        throw new Error(err);
      }
    },
  },
};

export default riderResolver;
