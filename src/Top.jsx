// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top-left of the page
  }, [pathname]); // Runs every time the URL path changes

  return null;
};

export default ScrollToTop;
