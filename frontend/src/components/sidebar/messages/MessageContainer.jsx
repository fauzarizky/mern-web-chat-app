import { useEffect } from "react";
import { useConversation } from "../../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages, TiArrowBack } from "react-icons/ti";
import { useAuthContext } from "../../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    // clear selected conversation when leaving the chat page (cleanup function (unmounts))
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className={`w-full md:min-w-[450px] ${selectedConversation ? "flex" : "hidden"} md:flex flex-col`}>
      {!selectedConversation ? (
        <NochatSelected />
      ) : (
        <>
          <div className="flex justify-between items-center bg-slate-500">
            <div className="px-4 py-2">
              <span className="label-text">To:</span> <span className="text-gray-900 font-bold">{selectedConversation?.fullName}</span>
            </div>
            <button className="px-4" onClick={() => setSelectedConversation(null)}>
              <TiArrowBack className="w-6 h-6 hover:text-white transition-all duration-300" />
            </button>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NochatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="hidden sm:flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
