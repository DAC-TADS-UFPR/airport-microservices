"use client";
import "./ButtonDefault.scss";
import { FC } from "react";

type Size = "default" | "small";
type Variant = "plus" | "export";
type Color = "default" | "white" | "red";

type Props = {
  children?: string;
  target?: string;
  variant?: Variant;
  loading?: boolean;
  color?: Color;
  size?: Size;
} & React.ComponentProps<"button">;

const ButtonDefault: FC<Props> = ({ children, variant, color = "default", size = "default", loading, ...rest }) => {
  return (
    <button
      disabled={loading}
      type="button"
      className={`buttonDefault ${variant === "export" || loading ? "buttonDefault--reverse" : ""} buttonDefault--${size} buttonDefault--${color}`}
      {...rest}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
};

export default ButtonDefault;
