import React from "react";
import { styled } from "../stitches.config";
import { MixerHorizontalIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleVisible,
  setDate,
  setView,
} from "../redux/features/toolbarSlice";

export default AppBar;

function AppBar({}) {
  const { view, date, views, visible } = useSelector((state) => state.toolbar);
  const dispatch = useDispatch();

  return (
    <Container>
      <MixerHorizontalIcon onClick={() => dispatch(toggleVisible())} />
      <HamburgerMenuIcon onClick={() => dispatch(toggleVisible())} />
    </Container>
  );
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
  display: "flex",
  ai: "center",
  "@bp1": {
    padding: 10,
    jc: "space-between",
  },
});
