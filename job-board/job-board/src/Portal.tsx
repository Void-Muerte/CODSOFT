import { createPortal } from "react-dom";
import React from "react";

type PortalProps = {
  open: boolean;
  children: React.ReactNode;
};
function Portal({ open, children }: PortalProps) {
  if (!open) return null;
  return createPortal(
    <>{children}</>,
    document.getElementById("modals") as HTMLElement
  );
}

export default Portal;
