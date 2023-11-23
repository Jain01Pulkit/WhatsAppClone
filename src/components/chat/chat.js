import React, { useEffect, useState } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  MicOutlined,
} from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
const Chat = ({ messages }) => {
  console.log("messgassaas", messages);
  const { email, userName } = useSelector((state) => state?.reducer);

  const [input, setInput] = useState();
  // useEffect(() => {
  //   sendMessage();
  // }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:9001/messages/new", {
      message: input,
      name: userName,
      timestamp: new Date().getTime(),
      received: true,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((item) => (
          <p className={`chat__message ${item.received && "chat__receiver"} `}>
            <span className="chat__name">{item?.name}</span>
            {item?.message}
            <span className="chat__timestamp">
              {moment(Number(item?.timestamp)).format("hh:mm")}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicOutlined />
      </div>
    </div>
  );
};

export default Chat;
