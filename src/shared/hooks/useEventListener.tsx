import { useEffect, useRef } from "react";

const useEventListener = (
  eventType?: any,
  callback?: () => any,
  element: any = window
) => {
  const callbackRef = useRef<any>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const handler = (e: any) => callbackRef?.current(e);
    element?.addEventListener(eventType, handler);

    return () => element?.removeEventListener(eventType, handler);
  }, [eventType, element]);
};

export default useEventListener;
