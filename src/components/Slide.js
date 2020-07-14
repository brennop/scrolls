import React, { useEffect, useRef } from "react";
import Markdown from "markdown-it";
import emoji from "markdown-it-emoji";

const md = new Markdown();
md.use(emoji);

const Slide = ({ value }) => {
  const section = useRef();

  useEffect(() => {
    section.current.scrollIntoView({ behavior: "smooth" });
  }, [section, value]);

  return (
    <section
      ref={section}
      dangerouslySetInnerHTML={{ __html: md.render(value) }}
    ></section>
  );
};

export default Slide;

