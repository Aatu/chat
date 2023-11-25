import styled, { css } from "styled-components";

export const baseStyle = css`
  font-family: "arcade-classic";
  color: green;
`;

export const Heading = styled.h1`
  ${baseStyle}
  letter-spacing: 0.3rem;
  text-transform: uppercase;
`;

export const Text = styled.span`
  ${baseStyle}
  font-size: 1.5rem;
  letter-spacing: 0.3rem;
`;

export const BoldText = styled.span`
  ${baseStyle}
  font-size: 1.5rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  font-weight: bold;
  color: lime;
`;
