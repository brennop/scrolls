import React, { useEffect, useRef } from "react";

const Slide = ({ children }) => {
  const section = useRef();

  useEffect(() => {
    section.current.scrollIntoView({ behavior: "smooth" });
  }, [section]);

  return <section ref={section}>{children}</section>;
};

export default Slide;

