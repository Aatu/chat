import styled from "styled-components";
import { baseStyle } from "./typography";

export const ChatButton = styled.button`
  ${baseStyle};
  border: 2px solid green;
  background-color: transparent;
  height: 3rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 2rem;
  padding: 5px;
  cursor: pointer;

  &:focus,
  &:active {
    border: 2px solid lime;
    outline: none;
  }
`;

export const ButtonLink = styled.button`
  ${baseStyle};
  background-color: transparent;
  width: auto;
  box-sizing: border-box;
  font-size: 1.5rem;
  cursor: pointer;
  border: none;
  text-align: left;
  padding: 0;
  margin: 0;

  &:hover {
    border: none;
    color: lime;
    text-decoration: underline;
  }
`;
