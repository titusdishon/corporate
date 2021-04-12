import jwt from "jsonwebtoken";
import { AuthenticationError, ForbiddenError } from "apollo-server";

export const authenticateToken = (token) => {
  if (token == null) return false;
  const verify = jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return false;
    return user;
  });
  return verify;
};

export const authenthenticate = (context) => {
  if (context.user) {
    if (!context.user.roles.includes("ADMIN")) {
      throw new ForbiddenError(
        "You do not have permission to access this resource"
      );
    }
    if (!context.user) {
      throw new AuthenticationError(
        "You must be logged in to access this resource"
      );
    }
  } else {
    throw new AuthenticationError("Login to access resource");
  }
};

export const authenthenticateBranchAdmin = (context) => {
  if (context.user) {
    if (!context.user.roles.includes("BRANCH")) {
      throw new ForbiddenError(
        "You do not have permission to access this resource"
      );
    }
    if (!context.user) {
      throw new AuthenticationError(
        "You must be logged in to access this resource"
      );
    }
  } else {
    throw new AuthenticationError("Login to access resource");
  }
};
