import React from "react";
import { styled } from "../stitches.config.ts";

export default AppBar;

function AppBar({}) {
  return <Container></Container>;
}

const Container = styled("div", {
  height: "8vh",
  width: "100%",
  position: "fixed",
  right: 0,
  top: 0,
  left: 0,
  backgroundColor: "$mauve1",
  boxShadow: "0px 1px 3px 2px rgba(0,0,0,0.2); ",
  "@bp1": {},
});
