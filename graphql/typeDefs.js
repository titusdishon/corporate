import graphql from "graphql-tag";

export const typeDefs = graphql`
  type avatar {
    public_id: String!
    url: String
  }
  type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
    phoneNumber: String!
    corporate: String
    branch: String!
    avatar: avatar
    roles: [String]
    isActive: Boolean
    createdAt: String
    updatedAt: String
    createdBy: String
    creatorId: String
  }

  type Employee {
    employeeName: String!
    email: String!
    phoneNumber: String!
    walletBalance: Int!
    avatar: avatar
    branch: String!
    riderCode: String!
    selfApproved: Boolean!
    isActive: Boolean!
    corporate: String!
    createdAt: String
    createdBy: String
  }

  type EmployeeResponse {
    employeeName: String
    email: String
    phoneNumber: String
    walletBalance: Int
    avatar: avatar
    branch: String
    riderCode: String
    isActive: Boolean
    selfApproved: Boolean
    corporate: String
    createdAt: String
    createdBy: String
  }
  type RideProfileType {
    ISActive: Boolean
    ProfileImage: String
    DateCreated: String
  }
  type Rider {
    UserName: String
    Name: String
    NormalizedUserName: String
    Email: String
    NormalizedEmail: String
    EmailConfirmed: String
    PhoneNumber: String
    PhoneNumberConfirmed: String
    UserProfileFileTypes: [RideProfileType]
    AreaCode: String
  }
  type Branch {
    id: ID!
    creatorId: String
    updatedBy: String
    corporateCode: String
    isActive: Boolean!
    dateOfActivation: String
    activatedBy: String
    branchName: String!
    corporateName: String!
    countyOrState: String!
    cityOrTown: String!
    street: String!
    phoneNumber: String!
    numberOfEmployees: Int!
    dateCreated: String!
    dateModified: String!
    createdBy: String
  }

  type Corporate {
    id: ID!
    AreaCode: String
    DateCreated: String
    DateModified: String
    CreatedBy: String
    IsActive: Boolean
    Activated: String
    ActivatedBy: String
    DisplayName: String
    LegalOrTradingName: String
    RegistrationNumber: String
    RegistrationDate: String
    CompanyCode: String
    CountyOrState: String
    PostalCode: String
    PostalAddress: String
    CityOrTown: String
    Street: String
    BuildingNameOrNumber: String
    PrimaryPhoneNumber: String
    SecondaryPhoneNumber: String
    EmailAddress: String
    Website: String
    NumberOfEmployees: Int
  }

  type SingleExpense {
    dateCreated: String
    amount: Int
  }

  type Budget {
    id: ID!
    corporate: String!
    BudgetBalance: Int
  }

  type UserResponse {
    id: ID!
    roles: [String]
    email: String
    token: String
    phoneNumber: String
    corporate: String
    branch: String
    isActive:Boolean
    userName: String
    createdAt: String
    createdBy: String
    creatorId: String
    updatedAt:String
  }

  input RegisterInput {
    userName: String!
    password: String!
    phoneNumber: String!
    email: String!
    corporate: String
    branch: String
    avatarUrl: String
    roles: [String]
    isActive: Boolean
  }

  # branch object
  input BranchInput {
    isActive: Boolean!
    branchName: String!
    countyOrState: String!
    cityOrTown: String!
    street: String!
    phoneNumber: String!
    numberOfEmployees: Int!
  }

  input EmployeeInput {
    employeeName: String!
    email: String!
    isActive: Boolean!
    selfApproved: Boolean!
    phoneNumber: String!
    walletBalance: Int!
    riderCode: String!
    branch: String!
    corporate: String!
  }

  #queries objects
  type Query {
    branches: [Branch]
    corporates: [Corporate]
    getCorporate(id: ID!): Corporate
    branch(id: ID!): Branch
    getUsers: [User]
    employees: [Employee]
    getEmployee(riderCode: String!): Employee
    getUser(userId: ID!): User
    getRider(phoneNumber: String!): Rider
    getBudget: [Budget]
  }

  #mutations
  type Mutation {
    # regiuster a new system user
    register(registerInput: RegisterInput): UserResponse!

    # update an existing organization branch
    updateBranch(branchInput: BranchInput): Branch!

    # create a new organization branch
    createBranch(branchInput: BranchInput): Branch!

    #create an employee
    createEmployee(employeeInput: EmployeeInput): EmployeeResponse!
    # assign a new user to role
    assignUserToRole(roleName: String!, userId: String): String!
    # system user login
    login(email: String!, password: String): UserResponse!
    removeEmployee(userId: String!): String!
  }
`;
