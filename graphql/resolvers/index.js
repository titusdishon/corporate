import userResolvers from "./user.js";
import branchResolver from "./branch.js";
import corporateResolver from "./corporate.js";
import employeeResolver from "./employee.js";
import riderResolver from "./rider.js";

const resolvers = {
  Query: {
    ...branchResolver.Query,
    ...userResolvers.Query,
    ...corporateResolver.Query,
    ...employeeResolver.Query,
    ...riderResolver.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...branchResolver.Mutation,
    ...employeeResolver.Mutation
  },
};

export default resolvers;
