import { useState, useEffect, useRef } from "react";

/**
 * 1초 동안 숫자가 막 바뀌다가 마지막에 천천히 고정되는 훅
 */
export function useSlot(
  destination: number,
  dependency: boolean,
  delay: number
): [number] {
  const [count, setCount] = useState(0);
  const delayRef = useRef(delay);

  useEffect(() => {
    let handler: NodeJS.Timeout;

    if (count < destination && dependency) {
      handler = setInterval(() => {
        setCount((prev) => prev + 1);
        if (count > destination - 15) {
          delayRef.current += 10;
        }
      }, delayRef.current);
    }

    if (count >= destination && handler!) {
      clearInterval(handler);
    }

    return () => clearInterval(handler);
  }, [count, destination, dependency]);

  return [count];
}
