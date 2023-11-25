import styled from "styled-components";
import { baseStyle } from "./typography";

export const ChatInput = styled.input`
  ${baseStyle};
  border: 2px solid green;
  background-color: transparent;
  height: 3rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 2rem;
  padding: 5px;
  caret-color: lime;

  &:focus,
  &:active {
    border: 2px solid lime;
    outline: none;
  }
`;
