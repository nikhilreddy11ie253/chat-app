import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { FiClock } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <>
      <HeaderContainer>
        {/* Avatar Component Section */}
        <AvatarSection>
          <AvatarComponent
            onClick={() => auth.signOut()}
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <FiClock />
        </AvatarSection>
        <HeaderSearch>
          <FiSearch />
          <input placeholder="Search" type="search" />
        </HeaderSearch>
        {/* Header Right Section */}
        <HeaderRight>
          <FiInfo />
        </HeaderRight>
      </HeaderContainer>
    </>
  );
}

export default Header;

const HeaderContainer = styled.div`
  background-color: var(--main_color);
  color: #fff;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  height: 10vh;
`;

const AvatarSection = styled.div`
  flex: 0.2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const AvatarComponent = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  justify-content: center;
  align-items: center;
  background-color: var(--main_secondary_color);
  color: gray;
  border-radius: 6px;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    padding: 8px 0;
  }

  > input:focus {
    outline: none;
  }
`;

const HeaderRight = styled.div`
  padding: 0 1rem;
  display: flex;
  flex: 0.2;
  justify-content: flex-end;
  align-items: center;
`;
