import axios from "axios";
import { LoginInputType } from "../context/AuthProvider";
interface registerInputType {
  name: string;
  email: string;
  password: string;
}
class Authentication {
  async register(value: registerInputType) {
    console.log("request being send");
    const res = await axios.post("http://localhost:5100/api/register", value);
    if (!res) {
      return false;
    }
    return true;
  }
  async login(value: LoginInputType) {
    const res = await axios.post("http://localhost:5100/api/login", value);
    return res.data;
  }
}
export default new Authentication();
