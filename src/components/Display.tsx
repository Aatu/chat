import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";
import { bordersInside, bordersOutside, softBevelInverted } from "./borders";

interface Props {
  className?: string;
  color?: string;
  children?: ReactNode;
}

export const Display: React.FC<Props> = ({
  className,
  color = "#333224",
  children,
}) => {
  return (
    <Container className={className} color={color}>
      <ScreenBorders color={color} />
      <Screen>
        <Contents>{children}</Contents>
      </Screen>
      <Rough color={color} />
    </Container>
  );
};

const Contents = styled.div`
  margin: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  overflow: hidden;
  position: relative;
`;

const Container = styled.div<{ color: string }>`
  display: flex;
  flex-grow: 1;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  background-color: ${({ color }) => color};
  border-radius: 20px;
  position: relative;

  box-shadow: -10px 10px 10px 0 rgba(0, 0, 0, 0.5);

  ${({ color }) => bordersOutside(color, 4)}
`;

const ScreenBorders = styled.div<{ color: string }>`
  background-color: transparent;
  border-radius: 30px;
  ${({ color }) => bordersInside(color, 8)}
  box-sizing: border-box;
  position: relative;
  position: absolute;
  left: 60px;
  right: 60px;
  top: 60px;
  bottom: 60px;
`;

const Rough = styled.div<{ color: string }>`
  position: absolute;
  background-color: ${({ color }) => darken(0.4, color)};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 20px;
  opacity: 0.2;
  mask-image: url("rough2.png");
  background-image: url("metal.jpg");
  border: 2px solid black;
`;

const flicker = css`
  @keyframes flicker {
    0% {
      opacity: 0.27861;
    }
    5% {
      opacity: 0.34769;
    }
    10% {
      opacity: 0.23604;
    }
    15% {
      opacity: 0.90626;
    }
    20% {
      opacity: 0.18128;
    }
    25% {
      opacity: 0.83891;
    }
    30% {
      opacity: 0.65583;
    }
    35% {
      opacity: 0.67807;
    }
    40% {
      opacity: 0.26559;
    }
    45% {
      opacity: 0.84693;
    }
    50% {
      opacity: 0.96019;
    }
    55% {
      opacity: 0.08594;
    }
    60% {
      opacity: 0.20313;
    }
    65% {
      opacity: 0.71988;
    }
    70% {
      opacity: 0.53455;
    }
    75% {
      opacity: 0.37288;
    }
    80% {
      opacity: 0.71428;
    }
    85% {
      opacity: 0.70419;
    }
    90% {
      opacity: 0.7003;
    }
    95% {
      opacity: 0.36108;
    }
    100% {
      opacity: 0.24387;
    }
  }

  &::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    animation: flicker 0.15s infinite;
    border-radius: 20px;
  }

  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
    border-radius: 20px;
  }
`;

const Screen = styled.div`
  position: absolute;
  z-index: 2;
  left: 68px;
  right: 68px;
  top: 68px;
  bottom: 68px;
  background-color: #1b1b1b;
  overflow: hidden;

  box-sizing: border-box;

  border-radius: 20px;
  ${softBevelInverted(20)};
  border: 1px solid black;
  ${flicker}
`;
