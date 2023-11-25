import { darken, lighten } from "polished";
import { css } from "styled-components";

export const bordersInside = (color: string, amount: number = 10) => css`
  border-top: ${amount}px solid ${darken(0.2, color)};
  border-right: ${amount}px solid ${darken(0.1, color)};
  border-bottom: ${amount}px solid ${lighten(0.2, color)};
  border-left: ${amount}px solid ${lighten(0.1, color)};
`;

export const bordersOutside = (color: string, amount: number = 10) => css`
  border-bottom: ${amount}px solid ${darken(0.2, color)};
  border-left: ${amount}px solid ${darken(0.1, color)};
  border-top: ${amount}px solid ${lighten(0.2, color)};
  border-right: ${amount}px solid ${lighten(0.1, color)};
`;

export const softBevel = (amount: number = 5) => css`
  box-shadow: inset ${amount}px ${amount}px ${amount}px 0
      rgba(255, 255, 255, 0.1),
    inset -${amount}px -${amount}px ${amount}px 0 rgba(0, 0, 0, 0.5);
`;

export const softBevelInverted = (amount: number = 5) => css`
  box-shadow: inset -${amount}px 0px ${amount}px 0 rgba(255, 255, 255, 0.1),
    inset 0px ${amount}px ${amount}px 0 rgba(255, 255, 255, 0.1),
    inset ${amount}px 0px ${amount}px 0 rgba(0, 0, 0, 0.5),
    inset 0px -${amount}px ${amount}px 0 rgba(0, 0, 0, 0.5);
`;
