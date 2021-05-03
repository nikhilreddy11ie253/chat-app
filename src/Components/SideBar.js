import React from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { MdLens } from "react-icons/md";
import SideBarOptions from "./SideBarOptions";
import { MdInsertComment } from "react-icons/md";
import { MdInbox } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { MdBookmarkBorder } from "react-icons/md";
import { MdDrafts } from "react-icons/md";
import { MdApps } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { MdPermMedia } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function SideBar() {
  //   Firebase Hooks fetching rooms from db
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <>
      <SideBarContainer>
        {/* HeaderContainer */}
        <Header>
          <HeaderInfo>
            <h2>Channel Name</h2>
            <UserNameInfo>
              <MdLens />
              <h3>{user.displayName}</h3>
            </UserNameInfo>
          </HeaderInfo>
          <FiEdit2 />
        </Header>
        <Options>
          <SideBarOptions Icon={MdInsertComment} title="Threads" />
          <SideBarOptions Icon={MdInbox} title="Mentions & reactions" />
          <SideBarOptions Icon={MdDrafts} title="Saved Items" />
          <SideBarOptions Icon={MdBookmarkBorder} title="Channel browser" />
          <SideBarOptions Icon={MdApps} title="People & users groups" />
          <SideBarOptions Icon={MdPermMedia} title="Apps" />
          <SideBarOptions Icon={MdPeopleOutline} title="File browser" />
          <SideBarOptions Icon={MdExpandLess} title="Show less" />
          <hr />
          <SideBarOptions Icon={MdExpandMore} title="Channel" />
          <hr />
          <SideBarOptions Icon={MdAdd} addChannelOption title="Add Channel" />
          {channels?.docs.map((doc) => {
            return (
              <>
                <SideBarOptions
                  key={doc.id}
                  id={doc.id}
                  title={doc.data().name}
                />
              </>
            );
          })}
        </Options>
      </SideBarContainer>
    </>
  );
}

export default SideBar;

const SideBarContainer = styled.div`
  display: flex;
  border-top: 1px solid gray;
  color: #fff;
  flex: 0.25;
  flex-direction: column;
  background-color: var(--main_color);
  /* margin-top: 50px; */
  padding-bottom: 1rem 0;
`;
const Header = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
`;
const HeaderInfo = styled.div`
  > h2 {
    font-weight: 500;
  }
`;
const UserNameInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  > h3 {
    font-weight: 400;
    padding: 0 0.5rem;
  }

  > svg {
    color: lightgreen;
    font-size: 10px;
  }
`;

const Options = styled.div`
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 0.2px solid gray;
  }
`;
