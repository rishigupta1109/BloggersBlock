import Link from "next/link";
import React from "react";
import { text } from "stream/consumers";
import styles from "./CustomButton.module.scss";
type Props = {
  id?: string;
  label?: string;
  border?: string;
  onClick?: () => void;
  corner?: string;
  type?: "filled" | "outlined";
  bg?: string;
  hoverbg?: string;
  textColor?: string;
  children?: React.ReactElement;
  link?: string;
  hoverTextColor?: string;
};

export default function CustomButton({
  id,
  label,
  onClick,
  corner,
  type,
  bg = "white",
  hoverbg,
  textColor,
  children,
  border,
  link,
  hoverTextColor = "white",
}: Props) {
  if (link) {
    return (
      <Link
        onClick={onClick}
        onMouseOver={(e) => {
          if (hoverbg) e.currentTarget.style.background = hoverbg;
          if (hoverTextColor) e.currentTarget.style.color = hoverTextColor;
        }}
        onMouseLeave={(e) => {
          if (bg) e.currentTarget.style.background = bg;
          if (hoverTextColor && textColor)
            e.currentTarget.style.color = textColor;
        }}
        href={link}
        className={styles.button}
        style={{
          borderRadius: corner,
          backgroundColor: bg && type === "filled" ? bg : "white",
          color: textColor ? textColor : "black",
          border: border,
          justifyContent: children ? "space-evenly" : "center",
        }}
      >
        {label}
      </Link>
    );
  }
  return (
    <button
      onMouseOver={(e) => {
        if (hoverbg) e.currentTarget.style.background = hoverbg;

        if (hoverTextColor) e.currentTarget.style.color = hoverTextColor;
      }}
      onMouseLeave={(e) => {
        if (bg) e.currentTarget.style.background = bg;

        if (hoverTextColor && textColor)
          e.currentTarget.style.color = textColor;
      }}
      id={id}
      className={styles.button}
      onClick={onClick}
      style={{
        borderRadius: corner,
        backgroundColor: bg && type === "filled" ? bg : "white",
        color: textColor ? textColor : "black",
        border: border,
        justifyContent: children ? "space-evenly" : "center",
      }}
    >
      {label}
      {children}
    </button>
  );
}