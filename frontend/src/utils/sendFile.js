//sendfile
import {socket} from "../utils/Socket"
 export const sendFile = (roomId, user, file) => {
    const chunkSize = 64 * 1024; // 64KB
    let offset = 0;
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const chunk = e.target.result;
  
      socket.emit("send-messages", {
        roomId,
        user,
        fileName: file.name,
        fileType: file.type,
        chunk,
        isLastChunk: offset + chunkSize >= file.size,
      });
  
      offset += chunkSize;
      if (offset < file.size) {
        readSlice(offset);
      }
    };
  
    const readSlice = (o) => {
      const slice = file.slice(o, o + chunkSize);
      reader.readAsArrayBuffer(slice);
    };
  
    readSlice(0);
  };
  
