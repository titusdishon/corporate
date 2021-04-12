import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../../models/user.js";
import {
  validateLoginInput,
  validateRegistrationInputs,
} from "../../utils/validators.js";
import { UserInputError } from "apollo-server-errors";
import { authenthenticate } from "../../middleWares/authentication.js";

//generate a jwt token for the user
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
      corporate:user.corporate,
      branch: user.branch,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}
//user mutations
const userResolvers = {
  Query: {
    //Fetch all branch users
    async getUsers(_, __, context) {
      authenthenticate(context);
      let users;
      try {
        if(context.user.roles.includes("ADMIN")){
          users = await userModel
          .find()
          .sort({ dateCreated: -1 })
          .limit(100);
        } 
        return users;
      } catch {
        throw new Error(err);
      }
    },
    //get a single system user
    async getUser(_, { userId }, context) {
      authenthenticate(context);
      try {
        const user = await userModel.findById(userId.trim());
        return user;
      } catch {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        errors.general = "Sorry you entered the wrong data";
        throw new UserInputError("Sorry you entered the wrong data", {
          errors,
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const matches = await bcrypt.compare(password, user.password);
      if (!matches) {
        errors.general =
          "Wrong login credentials, Please check your password/email";
        throw new UserInputError(
          "Wrong login credentials, Please check your password/email",
          { errors }
        );
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    // create a new user
    async register(
      _,
      {
        registerInput: {
          email,
          password,
          userName,
          phoneNumber,
          corporate,
          isActive,
          branch,
          roles,
          avatar,
        },
      },
      context
    ) {
     //authenthenticate(context);
      //Validate user data
      const { valid, errors } = validateRegistrationInputs(
        email,
        phoneNumber,
        userName,
        password,
        isActive,
        corporate,
        branch,
        roles,
        avatar
      );

      if (!valid) {
        throw new UserInputError("You have entered invalid data", { errors });
      }

      const user = await userModel.findOne({ email });
      if (user) {
        errors.general = "User exists";
        throw new UserInputError("User exists", {
          errors: { email: "Email is already in use" },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new userModel({
        email,
        phoneNumber,
        userName,
        password,
        isActive,
        roles,
        avatar,
        branch,
        corporate:context.user.corporate,
        createdAt:new Date(),
        createdBy: context.user.email,
        creatorId: context.user.id,
      });

      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

export default userResolvers;
