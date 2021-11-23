import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [chats, setChats] = useState([]);

  console.log(chats);
  useEffect(() => {
    axios
      .get("/api/chat/")
      .then((response) => setChats(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {chats?.map((chat) => (
        <p>{chat.chatName}</p>
      ))}
    </div>
  );
};

export default Chat;
