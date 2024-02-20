import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "sonner";
import { useConversation } from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters");
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation);
      setSearch("")
    } else {
      toast.error(`No conversation found with name ${search}`);
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search..." className="input input-bordered rounded-full flex-1" />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
