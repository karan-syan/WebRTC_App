import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import ReactPlayer from "react-player";
import { Peer } from "../../service/Peer";
import "./Room.css";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string>();
  const [showStreamBtn, setShowStreamBtn] = useState<boolean>(true);
  const [myStream, setMyStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  const handleUserJoined = useCallback(
    ({ email, id }: { email: string; id: string }) => {
      console.log(`email ${email} joined the roon with id ${id}`);
      setRemoteSocketId(id);
    },
    []
  );

  const handleCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await Peer.getOffer();
    socket?.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log("incomming call ", from, offer);
      const ans = await Peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );
  const sendStream = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach((track) => {
        Peer.peer.addTrack(track, myStream);
        console.log(track, "track");
      });
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      console.log("call accepted", ans);
      Peer.setLocalDescription(ans);
      sendStream();
    },
    [sendStream]
  );

  const handleNegoNeedIncomming = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      const ans = await Peer.getAnswer(offer);
      console.log(ans, "as");
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await Peer.getOffer();
    console.log("peer:nego:needed", remoteSocketId);
    socket?.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [socket, remoteSocketId]);

  const handleNegoNeedFinal = useCallback(
    async ({ ans, from }: { from: string; ans: RTCSessionDescriptionInit }) => {
      console.log("final called", ans, Peer.peer.remoteDescription);
      if (ans.sdp !== Peer.peer.remoteDescription?.sdp) {
        await Peer.setLocalDescription(ans);
      }
      setShowStreamBtn(false);
    },
    []
  );

  useEffect(() => {
    Peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      Peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    Peer.peer.ontrack = async (ev: RTCTrackEvent) => {
      const rs = ev.streams;
      console.log("GOT TRACKS!!");
      console.log(rs, "io");
      setRemoteStream(rs[0]);
    };
  }, []);

  useEffect(() => {
    socket?.on("user:joined", handleUserJoined);
    socket?.on("incomming:call", handleIncommingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeedIncomming);
    socket?.on("peer:nego:final", handleNegoNeedFinal);
    return () => {
      socket?.off("user:joined", handleUserJoined);
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeedIncomming);
      socket?.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    sendStream,
  ]);

  useEffect(() => {
    console.log(remoteSocketId);
    console.log(remoteStream, "rs");
  }, [remoteSocketId, remoteStream]);

  return (
    <div>
      {remoteSocketId ? null : <h4> no one in room</h4>}
      {myStream && showStreamBtn && (
        <div className="callBtn">
          <button className="button" onClick={sendStream}>
            Accept Call &nbsp;
            <img src={`/images/phone.png`} alt="arrow" height="15" />
          </button>
        </div>
      )}
      {remoteSocketId && !myStream && (
        <div className="callBtn">
          <button className="button" onClick={handleCall}>
            Call &nbsp;
            <img src={`/images/phone.png`} alt="arrow" height="15" />
          </button>
        </div>
      )}

      {remoteStream ? (
        <div className="remoteStreamBox">
          <ReactPlayer
            url={remoteStream}
            height={"80vh"}
            width={"100%"}
            playing
          />
        </div>
      ) : (
        <div className="remoteStreamBox"></div>
      )}
      {myStream ? (
        <div className="localStreamBox">
          <ReactPlayer url={myStream} height={110} width={160} playing />
        </div>
      ) : (
        <div className="localStreamBox"></div>
      )}
    </div>
  );
};

export default Room;
