import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  joinRoom,
  toggleDashboard,
} from "../../redux/feature/RoomActionSlicer";

const Sidebar = ({ user }) => {
  // const [dashBoardOpen, setDashBoardOpen] = useState(true);
  const dashBoardOpen = useSelector((state) => state.room.dashBoardOpen);
  const roomList = useSelector((state) => state.room.roomList);
  const dispatch = useDispatch();
  console.log("roomlist" + roomList.length);

  function handleDashboard() {
    dispatch(toggleDashboard());
  }
  console.log(dashBoardOpen);
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
  };

  const buttonTap = {
    scale: 0.98,
  };

  return (
    <>
      {/* for mobile creating a hamburger menu  */}

      <motion.div
        className={`bg-black ${
          dashBoardOpen ? "basis-1/5" : "basis-1"
        } hidden  md:flex  border-r-4 border-indigo-700 p-6 flex flex-col h-full`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h1
          className=" flex items-center justify-between text-center text-white text-3xl font-bold mb-8 pb-4 border-b-2 border-indigo-400"
          variants={itemVariants}
        >
          <strong className={`${dashBoardOpen ? "text-xl" : "text-sm"}`}>
            {" "}
            Dashboard{" "}
          </strong>
          <span onClick={handleDashboard}>
            {dashBoardOpen && (
              <RxCross1 className="text-white cursor-pointer" />
            )}
            {!dashBoardOpen && (
              <RxHamburgerMenu className="text-sm cursor-pointer" />
            )}
          </span>
        </motion.h1>

        {/* Buttons */}
        <motion.div
          className="flex flex-col space-y-4 mb-8"
          variants={containerVariants}
        >
          <motion.button
            className={`bg-indigo-500 cursor-pointer ${
              !dashBoardOpen && "text-sm"
            }  hover:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200`}
            whileHover={buttonHover}
            whileTap={buttonTap}
            variants={itemVariants}
            onClick={() => dispatch(createRoom(true))}
          >
            Create Room
          </motion.button>
          <motion.button
            className={`bg-indigo-500 cursor-pointer ${
              !dashBoardOpen && "text-sm"
            }  hover:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200`}
            whileHover={buttonHover}
            whileTap={buttonTap}
            variants={itemVariants}
            onClick={() => dispatch(joinRoom(true))}
          >
            Join Room
          </motion.button>
        </motion.div>

        {/* Room List */}
        <motion.div className="flex-1 overflow-y-auto" variants={itemVariants}>
          <h3
            className={`text-white font-medium ${
              !dashBoardOpen && "text-sm"
            }  mb-4 text-lg`}
          >
            Active Rooms
          </h3>
          <div className="space-y-2">
            {roomList.length === 0 && (
              <h1
                className={`${!dashBoardOpen && "text-sm"} text-lg text-white`}
              >
                No Rooms active
              </h1>
            )}

            {roomList.length >= 1 && <RoomList roomList={roomList} />}
          </div>
        </motion.div>

        {/* User Profile */}
        <motion.div
          className="mt-auto pt-4 border-t-2 border-indigo-400"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="h-10 w-10 rounded-full bg-white text-3xl text-center flex items-center justify-center text-indigo-600 font-bold"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {user?.username[0]}
            </motion.div>
            <div>
              <p className="text-white font-medium">
                {user ? user.username : "john Doe"}
              </p>
              <p className="text-indigo-200 text-sm">User</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;
