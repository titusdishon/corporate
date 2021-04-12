import branchModel from "../../models/branch.js";
import {
  authenthenticate,
  authenthenticateBranchAdmin,
} from "../../middleWares/authentication.js";

const branchResolver = {
  Query: {
    //Fetch all branches
    async branches(_, __, context) {
      authenthenticate(context);
      try {
        let branches;
        if (context.user.roles.includes("ADMIN")) {
          branches = await branchModel
            .find({ corporateCode: context.user.corporate })
            .sort({ dateCreated: -1 })
            .limit(100);
        }
        return branches;
      } catch (err) {
        throw new Error(err);
      }
    },
    async branch(_, { id }, context) {
      authenthenticate(context);
      try {
        const branch = await branchModel.findById(id.trim());
        return branch;
      } catch {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createBranch(
      _,
      {
        branchInput: {
          isActive,
          dateOfActivation,
          branchName,
          corporateCode,
          corporateName,
          countyOrState,
          cityOrTown,
          street,
          phoneNumber,
          numberOfEmployees,
        },
      },
      context
    ) {
      authenthenticate(context);
      const newBranch = new branchModel({
        isActive,
        dateOfActivation,
        activatedBy: context.user.email,
        branchName,
        corporateName,
        countyOrState,
        cityOrTown,
        street,
        phoneNumber,
        numberOfEmployees,
        corporate:context.user.corporate,
        corporateCode:context.user.corporate,
        createdBy: context.user.email,
        creatorId: context.user.id,
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      const res = await newBranch.save();
      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};

export default branchResolver;
