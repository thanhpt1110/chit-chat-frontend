import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const VideoCall: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Sử dụng WebRTC để thiết lập kết nối video call
    const servers = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // STUN server miễn phí
    };
    const peerConnection = new RTCPeerConnection(servers);

    // Thêm local stream vào video
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, stream));
      });

    // Lắng nghe luồng video từ remote
    peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    // TODO: Thêm signaling (với WebSocket hoặc SignalR) để gửi SDP Offer/Answer

    return () => {
      peerConnection.close();
    };
  }, []);

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
