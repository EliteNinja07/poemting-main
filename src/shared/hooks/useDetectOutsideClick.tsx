import { useEffect, useRef } from "react";

const useDetectOutsideClick = (callback: any) => {
  const ref = useRef<any>();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  });

  return ref;
};

export default useDetectOutsideClick;
