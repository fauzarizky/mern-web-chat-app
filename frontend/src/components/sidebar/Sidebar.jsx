import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useConversation } from "../../zustand/useConversation";

const Sidebar = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className={`${selectedConversation ? "hidden" : "flex"} w-[100vw] md:w-auto md:flex flex-col md:border-r md:border-slate-500 p-4`}>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
