import { Iuser } from "../utils/init";

export const removePassword = (user: Iuser): Omit<Iuser, "password"> => {
  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
  };
};
