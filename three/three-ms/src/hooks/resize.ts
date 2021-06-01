import { useEffect, useState } from "react";
export const useSize = (ref: any) => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    setSize({width: ref?.current.clientWidth, height: ref?.current.clientHeight});
    window.addEventListener("resize", () => {
      console.log(ref?.current.clientWidth);
      setSize({width: ref?.current.clientWidth, height: ref?.current.clientHeight});
    });
  }, [ref]);
  return size;
};
