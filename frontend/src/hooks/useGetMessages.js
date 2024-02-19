/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useConversation } from "../zustand/useConversation";
import { toast } from "sonner";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const getMessages = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/messages/${selectedConversation._id}`);
      const data = await res.json();
      if (!data) throw new Error(data.error);
      setMessages(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
