import { useEffect, useRef } from "react";

type CallbackFunction = (
  ref: React.RefObject<HTMLDivElement>,
  deltaY: number,
  scrollTop: number
) => void;

/**
 * 마우스 휠을 감지하여 콜백함수를 처리할 수 있는 ref 객체를 반환하는 커스텀 훅.
 * 디바운스 기법을 적용하여 트랙패드에서 많은 이벤트 발생해도 한 번만 처리함.
 * @param callback 마우스 휠 이후 처리될 콜백함수 (deltaY, scrollTop)을 인자로 받는다.
 */
const useWheel = (
  callback: CallbackFunction
): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (!timeoutRef.current) {
      callback(ref, event.deltaY, ref.current?.scrollTop!);
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
      }, 1500);
    }
  };

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleMouseWheel);
    }
    return () => {
      //메모리 누수 방지를 위한 이벤트 삭제
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleMouseWheel);
      }
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [ref, callback]);

  return ref;
};

export default useWheel;
