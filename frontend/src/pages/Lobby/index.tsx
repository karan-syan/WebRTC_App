import React, { useCallback, useEffect, useState } from "react";
import Card from "../../components/Card";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Lobby = () => {
  const [roomNo, setroomNo] = useState<string>("");
  const socket = useSocket();
  const auth = useAuth();

  const navigate = useNavigate();
  const handleSubmit = useCallback(() => {
    socket?.emit("room:join", { roomNo, email: auth.currentUser?.email });
  }, [roomNo, socket]);

  const handleJoinRoom = useCallback(
    (data: { roomNo: string; email: string }) => {
      const { roomNo } = data;
      console.log(data);
      navigate(`/room/${roomNo}`);
    },
    [roomNo, socket]
  );

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join");
    };
  }, [socket]);

  return (
    <div className="cardWrapper">
      <Card logo="email2.png" title="Enter your Room Number">
        <input
          type="number"
          className="inputText"
          value={roomNo}
          required
          placeholder={"Room Id"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setroomNo(event.target.value);
          }}
        />
        <button className="button" onClick={handleSubmit}>
          <span>{"Enter Room"}&nbsp;</span>
          <img src={`/images/arrow-forward.png`} alt="arrow" height="15" />
        </button>
      </Card>
    </div>
  );
};

export default Lobby;
