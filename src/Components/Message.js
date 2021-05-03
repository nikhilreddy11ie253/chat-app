import React from "react";
import styled from "styled-components";

function Message({ message, timestamp, user, userImage }) {
  const Time = new Date(timestamp?.toDate());
  console.log();
  return (
    <>
      <MessageContainer>
        <img src={userImage} alt="User Profile Pic" />
        <MessageInfo>
          <h4>
            {user}
            <p>{message}</p>
          </h4>
          <span>{Time.toUTCString()}</span>
        </MessageInfo>
      </MessageContainer>
    </>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  > img {
    height: 50px;
    border-radius: 8px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > h4 {
    font-weight: 500;
    > p {
      font-weight: 300;
    }
  }

  > span {
    padding: 5px;
    color: gray;
    font-weight: 200;
    margin-left: 4px;
    font-size: 10px;
  }
`;
