import { useEffect } from "react";

type CallbackFunction = (index: number) => void;

const useScrollCallback = (sections: number[], callback: CallbackFunction) => {
  function onScroll() {
    const scrollY = window.scrollY;
    for (let i = 0; i < sections.length; i++) {
      if (scrollY >= sections[i] && scrollY < sections[i + 1]) callback(i + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};

export default useScrollCallback;
