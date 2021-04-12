import corporateModel from "../../models/corporate.js";
import {
  authenthenticate,
  authenthenticateBranchAdmin,
} from "../../middleWares/authentication.js";

const corporateResolver = {
  Query: {
    //Fetch all branches
    async corporates(_, __, context) {
      authenthenticate(context);
      try {
        const corporates = await corporateModel.find()
          .sort({ dateCreated: -1 })
          .limit(100);
        return corporates;
      } catch {
        throw new Error(err);
      }
    },
    async getCorporate(_, { id }, context) {
      authenthenticate(context);
      try {
        const corporate = await corporateModel.findById(id.trim());
        return corporate;
      } catch {
        throw new Error(err);
      }
    },
  },
};

export default corporateResolver;
