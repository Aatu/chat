import styled, { createGlobalStyle } from "styled-components";
import { Display } from "./components/Display";
import { Chat } from "./components/chat/Chat";

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Display>
          <Chat />
        </Display>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;
