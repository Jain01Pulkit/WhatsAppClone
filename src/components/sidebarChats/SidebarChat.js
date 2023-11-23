import React from "react";
import "./sidebarChat.css";
import { Avatar } from "@material-ui/core";
const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>RoomName</h2>
        <p>Last Message</p>
      </div>
    </div>
  );
};

export default SidebarChat;
