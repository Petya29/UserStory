import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Paper } from "../../surfaces";
import classes from "./Snackbar.module.css";

type SnackbarProps = {
  isOpen: boolean,
  title: ReactNode,
  onClose: () => void,
}

let timer: number;

export const Snackbar = ({
  isOpen,
  title,
  onClose
}: SnackbarProps) => {

  const handleClose = () => {
    clearTimeout(timer);
    onClose();
  }

  useEffect(() => {
    if (isOpen) {
      timer = setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [isOpen]);

  return createPortal(
    <Paper
      className={[
        "border-2",
        "border-red-800",
        "text-red-800",
        "border-solid",
        "background-[#de090930]",
        classes["snackbar-paper"],
        isOpen ? classes["snackbar-paper-active"] : ""
      ].join(" ").trim()}
    >
      {title}
    </Paper>,
    document.body
  )
}
