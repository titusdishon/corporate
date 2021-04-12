import employeeModel from "../../models/employee.js";
import { authenthenticate } from "../../middleWares/authentication.js";
import bcrypt from "bcryptjs";

const employeeResolver = {
  Query: {
    //Fetch all branches
    async employees(_, __, context) {
      authenthenticate(context);
      let employees;
      try {
        if(context.user.roles.includes("ADMIN")){
          employees = await employeeModel
          .find({corporate:context.user.corporate})
          .sort({ dateCreated: -1 })
          .limit(100);
        }else{
          employees = await employeeModel
          .find({branch:context.user.branch})
          .sort({ dateCreated: -1 })
          .limit(100);
        }
        return employees;
      } catch {
        throw new Error(err);
      }
    },
    //Get an existing rider to add as an employee
    async getEmployee(_, { riderCode }, context) {
      authenthenticate(context);
      try {
        const employee = await employeeModel.findOne({
          riderCode: riderCode.trim(),
        });
        return employee;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    //create a new employee
    async createEmployee(
      _,
      {
        employeeInput: {
          employeeName,
          email,
          phoneNumber,
          walletBalance,
          avatar,
          riderCode,
          isActive,
          branch,
          corporate,
          updatedAt,
        },
      },
      context
    ) {
      authenthenticate(context);
      const password = await bcrypt.hash(phoneNumber, 12);
      const newEmployee = new employeeModel({
        employeeName,
        email,
        phoneNumber,
        avatar,
        isActive,
        password,
        branch,
        riderCode,
        walletBalance,
        corporate,
        createdAt: new Date(),
        createdBy: context.user.email,
        activated: new Date(),
        updatedAt,
      });
      const res = await newEmployee.save();
      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};

export default employeeResolver;
