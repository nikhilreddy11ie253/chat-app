import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import styled from "styled-components";
import Chat from "./Components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Components/Login";
import { FcFeedback } from "react-icons/fc";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <>
        <AppLoading>
          <LoadingContainer>
            <FcFeedback />
            <h1>Loading...</h1>
          </LoadingContainer>
        </AppLoading>
      </>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <ChatBody>
              {/* SideBar */}
              <SideBar />
              <Switch>
                <Route path="/" exact component={Chat} />
                {/* Chat */}
              </Switch>
            </ChatBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const ChatBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #f8f8f8;
`;
const LoadingContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0, 1px, 2px, rgba(0, 0, 0, 0.24);
  > h1 {
    font-weight: 100;
  }
  > svg {
    object-fit: contain;
    font-size: 100px;
    margin-bottom: 40px;
  }
`;
