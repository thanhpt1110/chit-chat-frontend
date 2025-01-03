import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { EndCallIcon } from "../../../components/icons/EndCallIcon";
import { MicrophoneIcon } from "../../../components/icons/MicrophoneIcon";
import { MicrophoneMutedIcon } from "../../../components/icons/MicrophoneMutedIcon";
import { ShareScreenIcon } from "../../../components/icons/ShareScreenIcon";
import { StopShareScreenIcon } from "../../../components/icons/StopShareScreenIcon";
import { VideoCallIcon } from "../../../components/icons/VideoCallIcon";
import { VideoCallMuteIcon } from "../../../components/icons/VideoCallMuteIcon";
import { socketBaseUrl } from "../../../helpers/constants/configs.constant";
import { WEB_SOCKET_EVENT } from "../../../helpers/constants/websocket-event.constant";

const VideoCall: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const connectionRef = useRef<HubConnection | null>(null);
  const iceCandidatesQueue = useRef<RTCIceCandidate[]>([]);
  const screenStreamRef = useRef<MediaStream | null>(null); // Ref để lưu stream màn hình

  const [isMuted, setIsMuted] = useState(true); // Trạng thái mic
  const [isScreenSharing, setIsScreenSharing] = useState(false); // Trạng thái chia sẻ màn hình
  const [isCameraOn, setIsCameraOn] = useState(true); // Trạng thái camera

  useEffect(() => {
    // const servers = {
    //   iceServers: [
    //     { urls: ["stun:hk-turn1.xirsys.com"] },
    //     {
    //       username:
    //         "t1v73xZPzrQUPUYowwXemStxpbhCDT3aafFfGTzjGMmsR929Wrjs20Ujnd5bBeiOAAAAAGdtFGt0aGFuaHB0MTExMA==",
    //       credential: "d3e1521c-c363-11ef-8aef-0242ac120004",
    //       urls: [
    //         "turn:hk-turn1.xirsys.com:80?transport=udp",
    //         "turn:hk-turn1.xirsys.com:3478?transport=udp",
    //         "turn:hk-turn1.xirsys.com:80?transport=tcp",
    //         "turn:hk-turn1.xirsys.com:3478?transport=tcp",
    //         "turns:hk-turn1.xirsys.com:443?transport=tcp",
    //         "turns:hk-turn1.xirsys.com:5349?transport=tcp",
    //       ],
    //     },
    //   ],
    // };

    const servers = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
      ],
    };

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

    const connection = new HubConnectionBuilder()
      .withUrl(`${socketBaseUrl}/hubs/conversation`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
    connectionRef.current = connection;

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
      while (iceCandidatesQueue.current.length > 0) {
        const candidate = iceCandidatesQueue.current.shift();
        if (candidate) {
          await peerConnection.addIceCandidate(candidate);
        }
      }
    });

    connection.on(
      WEB_SOCKET_EVENT.RECEIVE_ANSWER,
      async (connectionId, sdp) => {
        console.log("Received Answer:", sdp);
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription({ type: "answer", sdp })
        );
        while (iceCandidatesQueue.current.length > 0) {
          const candidate = iceCandidatesQueue.current.shift();
          if (candidate) {
            await peerConnection.addIceCandidate(candidate);
          }
        }
      }
    );

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

    connection.start().then(() => {
      console.log("SignalR connection established");
      connection
        .invoke(WEB_SOCKET_EVENT.JOIN_CONVERSATION_GROUP, conversationId)
        .then(() => {
          console.log("Joined conversation group:", conversationId);
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
          alert("Microphone is already in use by another application.");
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

    return () => {
      peerConnection.close();
      connection.stop();
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [conversationId]);

  const toggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Lắng nghe sự kiện khi stream bị hủy
      screenStream.getVideoTracks()[0].onended = () => {
        console.log("Screen share stopped by user from popup.");
        setIsScreenSharing(false); // Cập nhật trạng thái là không còn chia sẻ màn hình
      };

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      // Thêm track của màn hình vào peer connection
      screenStream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, screenStream);
      });

      setIsScreenSharing(true);
      screenStreamRef.current = screenStream; // Lưu lại stream chia sẻ màn hình
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      // Dừng tất cả các track của stream màn hình
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      setIsScreenSharing(false);

      // Khôi phục lại camera
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }

          // Thêm lại các track của stream camera vào peer connection
          stream.getTracks().forEach((track) => {
            peerConnectionRef.current?.addTrack(track, stream);
          });

          // Kiểm tra trạng thái isCameraOn và bật/tắt camera dựa trên giá trị của nó
          if (!isCameraOn) {
            // Tắt camera nếu isCameraOn là false
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = false; // Tắt camera
          }
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }
  };

  const toggleCamera = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !isCameraOn;
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleShareScreen = () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      startScreenShare();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex max-w-7xl w-full gap-4 mt-4">
        <div className="flex flex-1 flex-col justify-center items-center gap-4">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className={twMerge(
              "w-full rounded-xl bg-black",
              isCameraOn && "border-2 border-green-600"
            )}
            style={{
              aspectRatio: "16/9",
            }}
          />
          <h3>Local Video</h3>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center gap-4">
          <video
            style={{
              aspectRatio: "16/9",
            }}
            ref={remoteVideoRef}
            autoPlay
            className="border border-gray-300 w-full rounded-xl bg-black"
          />
          <h3>Remote Video</h3>
        </div>
      </div>
      <div className="flex gap-4 mt-4 fixed bottom-8">
        <button
          className="w-16 h-16 rounded-full flex justify-center items-center shadow-circleButton"
          onClick={toggleMute}
        >
          {isMuted ? <MicrophoneMutedIcon /> : <MicrophoneIcon />}
        </button>

        <button
          className="w-16 h-16 rounded-full flex justify-center items-center shadow-circleButton"
          onClick={toggleShareScreen}
        >
          {isScreenSharing ? <StopShareScreenIcon /> : <ShareScreenIcon />}
        </button>

        <button
          className="w-16 h-16 rounded-full flex justify-center items-center shadow-circleButton"
          onClick={toggleCamera}
        >
          {isCameraOn ? <VideoCallIcon /> : <VideoCallMuteIcon />}
        </button>
        <button
          onClick={() => {
            window.close();
          }}
          className="w-16 h-16 rounded-full flex justify-center items-center bg-red-700 shadow-circleButton"
        >
          <EndCallIcon className="text-white h-24 w-24" />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
