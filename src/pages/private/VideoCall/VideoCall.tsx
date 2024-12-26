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
        {
          urls: ["stun:hk-turn1.xirsys.com"],
        },
        {
          username:
            "t1v73xZPzrQUPUYowwXemStxpbhCDT3aafFfGTzjGMmsR929Wrjs20Ujnd5bBeiOAAAAAGdtFGt0aGFuaHB0MTExMA==",
          credential: "d3e1521c-c363-11ef-8aef-0242ac120004",
          urls: [
            "turn:hk-turn1.xirsys.com:80?transport=udp",
            "turn:hk-turn1.xirsys.com:3478?transport=udp",
            "turn:hk-turn1.xirsys.com:80?transport=tcp",
            "turn:hk-turn1.xirsys.com:3478?transport=tcp",
            "turns:hk-turn1.xirsys.com:443?transport=tcp",
            "turns:hk-turn1.xirsys.com:5349?transport=tcp",
          ],
        },
      ],
    };
    console.log("STUN/TURN servers configured:", servers);

    // Khởi tạo peerConnection
    const peerConnection = new RTCPeerConnection(servers);
    peerConnectionRef.current = peerConnection;

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate:", event.candidate);
        connectionRef.current?.invoke(
          WEB_SOCKET_EVENT.SEND_ICE_CANDIDATE,
          conversationId,
          JSON.stringify(event.candidate)
        );
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log("ICE connection state:", peerConnection.iceConnectionState);
    };

    peerConnection.onconnectionstatechange = () => {
      console.log("Peer connection state:", peerConnection.connectionState);
    };

    peerConnection.onnegotiationneeded = async () => {
      console.log("Negotiation needed");
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      connectionRef.current?.invoke(
        WEB_SOCKET_EVENT.SEND_OFFER,
        conversationId,
        offer.sdp
      );
    };

    console.log("Peer connection created:", peerConnection);

    // Khởi tạo connection SignalR
    const connection = new HubConnectionBuilder()
      .withUrl(`${socketBaseUrl}/hubs/conversation`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    connectionRef.current = connection;

    // Nhận Offer từ đối tác
    connection.on(WEB_SOCKET_EVENT.RECEIVE_OFFER, async (connectionId, sdp) => {
      console.log("Received Offer:", sdp);
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription({ type: "offer", sdp })
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      connection.invoke(
        WEB_SOCKET_EVENT.SEND_ANSWER,
        conversationId,
        answer.sdp
      );

      // Xử lý hàng đợi ICE candidates
      while (iceCandidatesQueue.current.length > 0) {
        const candidate = iceCandidatesQueue.current.shift();
        if (candidate) {
          await peerConnection.addIceCandidate(candidate);
        }
      }
    });

    // Nhận Answer từ đối tác
    connection.on(
      WEB_SOCKET_EVENT.RECEIVE_ANSWER,
      async (connectionId, sdp) => {
        console.log("Received Answer:", sdp);
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
      }
    );

    // Nhận ICE candidate
    connection.on(
      WEB_SOCKET_EVENT.RECEIVE_ICE_CANDIDATE,
      async (connectionId, candidate) => {
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
      }
    );

    // Khởi tạo kết nối SignalR
    connection.start().then(() => {
      console.log("SignalR connection established");
      connection
        .invoke(WEB_SOCKET_EVENT.JOIN_CONVERSATION_GROUP, conversationId)
        .then(() => {
          console.log("Joined conversation group:", conversationId);

          // Gửi Offer khi kết nối thành công
          const createOffer = async () => {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            connection.invoke(
              WEB_SOCKET_EVENT.SEND_OFFER,
              conversationId,
              offer.sdp
            );
            console.log("Sent Offer:", offer.sdp);
          };

          createOffer();
        });
    });

    // Lấy media và thêm track vào peerConnection
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
          alert("Microphone is already in use by another application.");
        } else {
          console.error("Error accessing media devices:", error);
        }
      });

    // Lắng nghe track từ remote peer
    peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    // Clean up khi component bị unmount
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
