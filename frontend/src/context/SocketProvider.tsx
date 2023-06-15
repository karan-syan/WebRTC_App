import { ReactNode, createContext, useContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";
const SocketContext = createContext<Socket | null>(null);
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useMemo(() => io("localhost:8000"), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
