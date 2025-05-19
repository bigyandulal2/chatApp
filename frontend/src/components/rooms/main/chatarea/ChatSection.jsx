import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import CreateRoomModal from "../modals/CreateRoomModal";
import JoinRoomModal from "../modals/JoinRoomModal";

const ChatSection = () => {
  const dashBoardOpen = useSelector((state) => state.room.dashBoardOpen);
  const createRoom = useSelector((state) => state.room.createRoom);
  const joinRoom = useSelector((state) => state.room.joinRoom);

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const buttonTap = {
    scale: 0.98,
  };

  return (
    <>
      <div
        className={`relative ${
          dashBoardOpen ? "basis-2/3" : "basis-3/3"
        } bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 h-screen flex flex-col ${
          createRoom || joinRoom ? "overflow-hidden" : ""
        }`}
      >
        {createRoom && <CreateRoomModal />}
        {joinRoom && <JoinRoomModal />}

        {/* Chat messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((msg) => (
            <motion.div
              key={msg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  msg % 2 === 0
                    ? "bg-indigo-600 rounded-tr-none"
                    : "bg-gray-700 rounded-tl-none"
                }`}
              >
                <p>Message {msg} - Lorem ipsum dolor sit amet.</p>
                <p className="text-xs text-gray-300 mt-1">10:3{msg} AM</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input area at bottom */}
        {!createRoom && !joinRoom && (
          <motion.div
            className="sticky bottom-0 p-4 bg-gray-800 border-t border-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <motion.button
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ChatSection;
