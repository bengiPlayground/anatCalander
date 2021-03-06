import React from "react";
import { styled } from "../../stitches.config";
import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { Cross1Icon } from "@radix-ui/react-icons";
// import { overlayStyles } from "./Overlay";
import { panelStyles } from "../Panel";
import { IconButton } from "../IconButton";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  //   ...overlayStyles,
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export function Dialog({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, {
  ...panelStyles,
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  maxHeight: "85vh",
  padding: "$4",
  marginTop: "-5vh",
  // animation: `${fadeIn} 125ms linear, ${moveDown} 125ms cubic-bezier(0.22, 1, 0.36, 1)`,

  // Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
  // Affects animated and non-animated dialogs alike.
  willChange: "transform",

  "&:focus": {
    outline: "none",
  },
});

const StyledCloseButton = styled(IconButton, {
  position: "absolute",
  top: "$2",
  right: "$2",
});

export const DialogContent =
  React.forwardRef <
  HTMLInputElement >
  (({ children, onClose, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      {children}
      <DialogPrimitive.Close
        as={StyledCloseButton}
        onClick={() => onClose()}
        variant="ghost"
      >
        {/* <Cross1Icon /> */}
      </DialogPrimitive.Close>
    </StyledContent>
  ));

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
