module.exports = (io, socket) => {
    socket.on("onmike", (data) => {
      console.log("Mike event:", data);
    });
  };
  