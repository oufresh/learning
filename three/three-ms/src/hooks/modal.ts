import { useState } from "react";

export const useModal = (v: boolean) => {
  const [visible, setVisible] = useState(false);

  return {
      visible,
      setVisible
  };
};
