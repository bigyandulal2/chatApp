// utils/receiveFile.js
import { socket } from "../utils/Socket";

export const setupFileReceiver = (addMessage) => {
  socket.on("received-messages", (data) => {
    const { user, text, fileName, fileType, fileData } = data;

    if (text) {
      addMessage({ sender: user, text });
    }

    if (fileData && fileType?.startsWith("image/")) {
      addMessage({
        sender: user,
        fileName,
        fileType,
        fileData, // already base64
      });
    } else if (fileData) {
      // Non-image files (e.g. PDF, zip)
      addMessage({
        sender: user,
        fileName,
        fileType,
        fileData,
      });
    }
  });
};
