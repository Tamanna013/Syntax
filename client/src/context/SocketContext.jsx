import { createContext, useContext, useState, useEffect } from "react";
import { useAppStore } from "@/store";
import { io } from "socket.io-client";
import { HOST } from "@/utils/constants";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      const socketInstance = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socketInstance.on("connect", () => {
        console.log("Connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, addMessage, selectedChatType } =
          useAppStore.getState();
        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("Message received ", message);
          addMessage(message);
        }
      };

      socketInstance.on("receiveMessage", handleReceiveMessage);

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
