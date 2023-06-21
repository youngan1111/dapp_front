import { useEffect, useState } from "react";
import Mobile from "./Mobile";
import PC from "./PC";

/**
 * PC / Mobile에 따라 바뀌는 네비게이션 바
 */
const NavBar = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (window.innerWidth <= 700) setIsMobile(true);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 700);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [loading]);

  return <>{isMobile ? <Mobile /> : <PC />}</>;
};

export default NavBar;
