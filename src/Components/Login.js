import React from "react";
import styled from "styled-components";
import { FcFeedback } from "react-icons/fc";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithRedirect(provider).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <>
      <LoginContainer>
        <LoginInnerContainer>
          <FcFeedback />
          <h1>Sign In</h1>
          <Button onClick={signIn}>SignIn with Google</Button>
        </LoginInnerContainer>
      </LoginContainer>
    </>
  );
}

export default Login;

const LoginContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #f8f8f8;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0, 1px, 2px, rgba(0, 0, 0, 0.24);

  > svg {
    object-fit: contain;
    font-size: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit;
    background-color: #0a8d48;
    color: white;

    :hover {
      color: #0a8d48;
    }
  }
`;
