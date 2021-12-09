import react, { useState, useEffect } from "react";
import { styled } from "../../stitches.config";
import moment from "moment";
import { Button } from "../Button";
import {
  SewingPinIcon,
  PersonIcon,
  ClockIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

export default function SimpleDialog({ children, toggle, isOpen, onSubmit }) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Dialog>
        <DialogHeader>
          <Button onClick={() => toggle(false)}>ביטול</Button>
          <Button onClick={() => onSubmit()}>שמור</Button>
        </DialogHeader>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </Overlay>
  );
}

const Overlay = styled("div", {
  position: "absolute",
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: 100,
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@bp1": {
    width: "100%",
  },
});

const Dialog = styled("div", {
  width: "50%",
  height: "70%",
  backgroundColor: "#fefefe",
  borderRadius: 5,
  //   padding: 5,
  "@bp1": {
    height: "100%",
    width: "100%",
  },
});

const DialogHeader = styled("div", {
  py: 5,
  display: "flex",
  ai: "cnetrt",
  justifyContent: "space-between",
  "@bp1": {},
});

const DialogContent = styled("div", {
  py: 5,
  display: "flex",
  fd: "column",
  alignItems: "center",
  justifyContent: "center",
  "@bp1": {},
});
