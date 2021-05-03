import React from "react";
import styled from "styled-components";
import { enterRoom } from "../features/appSlice";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import prompt from "smalltalk";

function SideBarOptions({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();

  const addChannel = () => {
    //Prompt for desktop

    // const channelName = prompt("Please Enter the channel name");
    prompt
      .prompt("Add Channel", "Name of your channel", "")
      .then((value) => {
        console.log(value);
        if (value) {
          db.collection("rooms").add({
            name: value,
          });
        }
      })
      .catch(() => {
        console.log("cancel");
      });
  };
  const SelectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <>
      <SideBarOptionsContainer
        onClick={addChannelOption ? addChannel : SelectChannel}
      >
        {Icon && <Icon fontSize="small" />}
        {Icon ? (
          <h3>{title}</h3>
        ) : (
          <SideBarOptionChannel>
            <span>#</span> {title}
          </SideBarOptionChannel>
        )}
      </SideBarOptionsContainer>
    </>
  );
}

export default SideBarOptions;

const SideBarOptionsContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  :hover {
    opacity: 0.8;
    background-color: var(--main_secondary_color);
  }
  > h3 {
    font-weight: 300;
  }
  > h3 > span {
    padding: 15px;
  }
  > svg {
    margin: 10px;
    font-size: 1.5rem;
    color: #fff;
  }
`;

const SideBarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
