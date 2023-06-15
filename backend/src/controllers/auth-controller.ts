import { Request, Response } from "express";
import { Users } from "../schema/user-schema";
import { removePassword } from "../services/userAuth-service";
import { Iuser } from "../utils/init";

class AuthController {
  async registerUser(req: Request, res: Response) {
    const { email, password, name }: Omit<Iuser, "userId"> = req.body;
    if (email && password && name) {
      const userCreate = await Users.create({
        email,
        name,
        password,
      });
      if (!userCreate)
        return res.status(500).json({ message: "failed to create user" });
      return res.status(200).json({ message: "user created" });
    } else {
      return res
        .status(500)
        .json({ message: "unable to create user due to invalid data" });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password }: Omit<Iuser, "userId" | "name"> = req.body;
    if (email && password) {
      const user = await Users.find({ email, password });
      if (!user) {
        return res.status(500).json({ message: "user not available" });
      }
      const filteredUserDetails: Omit<Iuser, "password"> = removePassword(
        user[0]
      );
      console.log(filteredUserDetails);
      return res.status(200).json(filteredUserDetails);
    }
  }
}
export default new AuthController();
