import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelId, chatRef }) {
  const [inputValue, setInputValue] = useState("");
  const [user] = useAuthState(auth);

  console.log(channelId);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputValue,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });

    setInputValue("");
  };
  return (
    <ChatContainer>
      <form action="">
        <input
          placeholder={`Message # ${
            channelName === undefined ? "Select Channel" : channelName
          }`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatContainer>
  );
}

export default ChatInput;

const ChatContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none;
  }
`;
