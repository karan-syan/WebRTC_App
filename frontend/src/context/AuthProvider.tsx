import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Authentication from "../service/Authentication";
interface Iuser {
  userId: Buffer;
  email: string;
  name: string;
}
export interface LoginInputType {
  email: string;
  password: string;
}
interface IUserContext {
  login: (inputs: LoginInputType) => void;
  currentUser: Iuser | null;
}
const AuthContext = createContext<IUserContext>({
  login: (inputs: LoginInputType) => {},
  currentUser: null,
});
export const useAuth = () => {
  const socket = useContext(AuthContext);
  return socket;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem("WebRTCuser");
  const [currentUser, setCurrentUser] = useState<Iuser | null>(
    user ? JSON.parse(user) : null
  );
  const login = async (inputs: LoginInputType) => {
    const res = await Authentication.login(inputs);
    setCurrentUser(res);
  };
  useEffect(() => {
    localStorage.setItem("WebRTCuser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
