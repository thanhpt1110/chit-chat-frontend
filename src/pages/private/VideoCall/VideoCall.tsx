import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { socketBaseUrl } from "../../../helpers/constants/configs.constant";
import { WEB_SOCKET_EVENT } from "../../../helpers/constants/websocket-event.constant";

const VideoCall: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const connectionRef = useRef<HubConnection | null>(null);
  const iceCandidatesQueue = useRef<RTCIceCandidate[]>([]);

  useEffect(() => {
    const servers = {
      iceServers: [
        { urls: "stun:ss-turn2.xirsys.com" },
        {
          urls: "turn:ss-turn2.xirsys.com:80?transport=udp",
          username:
            "sEzH9Tk29cZh_y5SJWmPnEKrvf9baguT_Nrl3U7vr0xLUDPZvjk39Cw9AaBDAx50AAAAAGdsBNh0aGFuaHB0MTExMA==",
          credential: "f4cf697a-c2c1-11ef-b060-0242ac140004",
        },
        {
          urls: "turn:ss-turn2.xirsys.com:3478?transport=udp",
          username:
            "sEzH9Tk29cZh_y5SJWmPnEKrvf9baguT_Nrl3U7vr0xLUDPZvjk39Cw9AaBDAx50AAAAAGdsBNh0aGFuaHB0MTExMA==",
          credential: "f4cf697a-c2c1-11ef-b060-0242ac140004",
        },
        {
          urls: "turn:ss-turn2.xirsys.com:80?transport=tcp",
          username:
            "sEzH9Tk29cZh_y5SJWmPnEKrvf9baguT_Nrl3U7vr0xLUDPZvjk39Cw9AaBDAx50AAAAAGdsBNh0aGFuaHB0MTExMA==",
          credential: "f4cf697a-c2c1-11ef-b060-0242ac140004",
        },
        {
          urls: "turn:ss-turn2.xirsys.com:3478?transport=tcp",
          username:
            "sEzH9Tk29cZh_y5SJWmPnEKrvf9baguT_Nrl3U7vr0xLUDPZvjk39Cw9AaBDAx50AAAAAGdsBNh0aGFuaHB0MTExMA==",
          credential: "f4cf697a-c2c1-11ef-b060-0242ac140004",
        },
        {
          urls: "turns:ss-turn2.xirsys.com:443?transport=tcp",
          username:
            "sEzH9Tk29cZh_y5SJWmPnEKrvf9baguT_Nrl3U7vr0xLUDPZvjk39Cw9AaBDAx50AAAAAGdsBNh0aGFuaHB0MTExMA==",
          credential: "f4cf697a-c2c1-11ef-b060-0242ac140004",
        },
        {
          urls: "turns:ss-turn2.xirsys.com:5349?transport=tcp",
          username:
            "sEzH9Tk29cZh_y5SJWmPnEKrvf9baguT_Nrl3U7vr0xLUDPZvjk39Cw9AaBDAx50AAAAAGdsBNh0aGFuaHB0MTExMA==",
          credential: "f4cf697a-c2c1-11ef-b060-0242ac140004",
        },
      ],
    };
    const peerConnection = new RTCPeerConnection(servers);
    peerConnectionRef.current = peerConnection;

    const connection = new HubConnectionBuilder()
      .withUrl(`${socketBaseUrl}/hubs/conversation`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    connectionRef.current = connection;

    connection.on("ReceiveOffer", async (connectionId, sdp) => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: "offer", sdp })
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      connection.invoke("SendAnswer", conversationId, answer.sdp);

      // Xử lý hàng đợi ICE candidates
      while (iceCandidatesQueue.current.length > 0) {
        const candidate = iceCandidatesQueue.current.shift();
        if (candidate) {
          await peerConnection.addIceCandidate(candidate);
        }
      }
    });

    connection.on("ReceiveAnswer", async (connectionId, sdp) => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp })
      );

      // Xử lý hàng đợi ICE candidates
      while (iceCandidatesQueue.current.length > 0) {
        const candidate = iceCandidatesQueue.current.shift();
        if (candidate) {
          await peerConnection.addIceCandidate(candidate);
        }
      }
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate:", event.candidate);
        connection.invoke(
          "SendIceCandidate",
          conversationId,
          JSON.stringify(event.candidate)
        );
      }
    };

    connection.on("ReceiveIceCandidate", async (connectionId, candidate) => {
      try {
        const iceCandidate = new RTCIceCandidate(JSON.parse(candidate));
        console.log("Received ICE candidate:", iceCandidate);
        if (peerConnection.remoteDescription) {
          await peerConnection.addIceCandidate(iceCandidate);
        } else {
          iceCandidatesQueue.current.push(iceCandidate);
        }
      } catch (error) {
        console.error("Error adding received ICE candidate", error);
      }
    });

    connection.start().then(() => {
      connection
        .invoke(WEB_SOCKET_EVENT.JOIN_CONVERSATION_GROUP, conversationId)
        .then(() => {
          const createOffer = async () => {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            connection.invoke("SendOffer", conversationId, offer.sdp);
          };

          createOffer();
        });
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, stream));
      })
      .catch((error) => {
        if (error.name === "NotReadableError") {
          console.error("Device is already in use:", error);
          alert(
            "Camera or microphone is already in use by another application."
          );
        } else {
          console.error("Error accessing media devices:", error);
        }
      });

    peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        connection.invoke(
          "SendIceCandidate",
          conversationId,
          JSON.stringify(event.candidate)
        );
      }
    };

    return () => {
      peerConnection.close();
      connection.stop();
    };
  }, [conversationId]);

  return (
    <div>
      <h1>Video Call - Conversation ID: {conversationId}</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <div>
          <h3>Local Video</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            style={{ width: "300px", background: "black" }}
          />
        </div>
        <div>
          <h3>Remote Video</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            style={{ width: "300px", background: "black" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
