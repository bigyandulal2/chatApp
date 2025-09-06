
import React, { useRef,useState } from "react";
import { HiOutlinePlus, HiOutlineEmojiHappy } from "react-icons/hi";
import { FaPaperPlane} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendFile } from "../../utils/sendFile";
import IconPicker from "../../components/IconPicker";
import MessageRecipientSelector from "../../components/MessageRecipientSelector";
import { setRecipient } from "../../redux/chatMessageActionSlicer";
export default function Composer({
  input,
  setInput,
  onSend,
  // new prop to handle sending recorded audio
}) {
  const user = useSelector((state) => state.login.user);
  const [showIconPicker, setShowIconPicker] = useState(false);
  // const [usersInRoom,setUsersInRoom]=useState([]);
  const recipient=useSelector((state)=>state.chat.recipient)
  // const [recipient,setRecipient]=useState("everyone");
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const dispatch=useDispatch();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      sendFile(id, user, e.target.files[0]);
      e.target.value = ""; // Reset input so same file can be sent again
    }
  };

 
  const handleIconSelect = (icon) => {
    console.log(icon);
    setInput(prev=>prev+icon)
    setShowIconPicker(false);
  };
  

  return (
    <footer className="bg-gray-900 p-3 flex items-center justify-center border-t border-gray-800">
      <div className="w-full max-w-2xl">
      <MessageRecipientSelector/>
          <div className="flex  items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
          <FileButton handleFileChange={handleFileChange} fileInputRef={fileInputRef} />
            {/* icons here */}
          <EmojiButton showIconPicker={showIconPicker} handleIconSelect={handleIconSelect} setShowIconPicker={setShowIconPicker}/>
          <InputButton input={input} setInput={setInput} onSend={onSend} recipient={recipient}/> 

          </div>
       
      </div>
    </footer>
  );
}
// emoji button logic here
function EmojiButton({showIconPicker,handleIconSelect,setShowIconPicker}){
   return(
    <div className="relative"> 
    <button
type="button"
onClick={() => setShowIconPicker(!showIconPicker)}
className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2"
aria-label="Emoji picker"
>
<HiOutlineEmojiHappy size={20} />
</button> 
{showIconPicker && (
<IconPicker
onSelect={handleIconSelect}
onClose={() => setShowIconPicker(false)}
/>
)}
</div>
   )
}
// file button component here 
function FileButton({handleFileChange,fileInputRef}){
     return(<>
     
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <label
              htmlFor="fileInput"
              className="mr-2 text-gray-200 hover:bg-gray-700 rounded-full p-2 cursor-pointer"
            >
              <HiOutlinePlus size={20} />
            </label>   
     </>)
}
// input button logic here 
function InputButton({input,setInput,onSend,recipient}){
  return(<>
       <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend(recipient)}
              placeholder="Type a message"
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
              spellCheck={false}
            />
          
              <button
                type="button"
                onClick={()=>onSend(recipient)}
                className="ml-2 bg-green-600 hover:bg-green-700 rounded-full p-2"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
  </>)
}

