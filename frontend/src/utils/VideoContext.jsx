// utils/VideoContext.jsx
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import api from "./api"; // Your Axios instance

export default function VideoProvider({ children }) {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let videoClient;

    const init = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("User ID not found. Please log in.");
          setLoading(false);
          return;
        }

        const res = await api.post("/token", { userId });
        const token = res.data.token;

        const apiKey = import.meta.env.VITE_CHAT_API;
        if (!apiKey) {
          setError("Missing VITE_CHAT_API environment variable.");
          setLoading(false);
          return;
        }

        videoClient = new StreamVideoClient({
          apiKey,
          user: { id: userId },
          token,
        });

        setClient(videoClient);
        setLoading(false);
      } catch (err) {
        console.error("Failed to initialize video client", err);
        setError("Failed to initialize video service. Please try again.");
        setLoading(false);
      }
    };

    init();

    return () => {
      if (videoClient) {
        videoClient.disconnectUser?.();
      }
    };
  }, []);

  if (loading) {
    return <div className="text-white text-center p-4">Loading video service...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
}
