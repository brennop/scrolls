import React, { useEffect, useRef } from "react";
import Markdown from "markdown-it";
import emoji from "markdown-it-emoji";
import attrs from "markdown-it-attrs";

const md = new Markdown();
md.use(emoji);
md.use(attrs);

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

