import React, { Children, useRef } from "react";
import styled from "@emotion/styled";
import Slide from "./Slide";

const Container = styled.div`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  display: flex;
  flex: 1;

  section {
    padding: 1em;
    font-size: 2em;
    width: 100%;
    flex: 1 0 auto;
    scroll-snap-align: start;
  }
`;

const Presentation = ({ children }) => {
  const ref = useRef();

  return (
    <Container ref={ref}>
      {Children.map(
        children,
        (child) =>
          child.props && (
            <Slide container={ref} key={child.key}>
              {child.props.children}
            </Slide>
          )
      )}
    </Container>
  );
};

export default Presentation;

