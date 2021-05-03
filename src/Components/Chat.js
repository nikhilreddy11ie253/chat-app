import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { MdStarBorder } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { selectRoomId } from "../features/appSlice";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Chat() {
  const ChatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessage, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    ChatRef?.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <>
      <ChatContainer>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>
                #{" "}
                {roomDetails?.data().name === undefined
                  ? "Roomname"
                  : roomDetails?.data().name}
              </strong>
              <MdStarBorder />
            </h4>
          </HeaderLeft>
          <HeaderRight>
            <p>
              <MdErrorOutline />
              Details
            </p>
          </HeaderRight>
        </Header>
        <ChatMessages>
          {/* Chat Goes here */}
          {roomMessage?.docs &&
            roomMessage?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <>
                  <Message
                    user={user}
                    userImage={userImage}
                    message={message}
                    timestamp={timestamp}
                  />
                </>
              );
            })}
          <ChatBottom ref={ChatRef} />
        </ChatMessages>
        <ChatInput
          chatRef={ChatRef}
          channelName={roomDetails?.data().name}
          channelId={roomId}
        />
      </ChatContainer>
    </>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
`;
const HeaderLeft = styled.div`
  > h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: lowercase;
  }
  > h4 > svg {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > svg {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-bottom: 90px;
`;

const ChatMessages = styled.div``;
const ChatBottom = styled.div``;
