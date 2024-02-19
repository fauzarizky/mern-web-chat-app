import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, reciverId], // get the conversation between sender and reciver
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    // await conversation.save();
    // await newMessage.save();

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const reciverSocketId = getReciverSocketId(reciverId);
    if (reciverSocketId) {
      // io.to(<socketId>.emit() used to send events to specific client
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userTochatId] },
    }).populate("messages"); // Not reference but actual messages

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
