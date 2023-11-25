import { useReducer } from "react";

export const useRerender = (): (() => void) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  return forceUpdate;
};
