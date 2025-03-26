import Link, { LinkProps } from "next/link";
import { FC } from "react";
import "./ButtonText.scss";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

type Props = {
  children?: string;
  target?: string;
} & LinkProps &
  React.ComponentProps<"a">;

const ButtonText: FC<Props> = ({ children, ...rest }) => {
  return (
    <div className="buttonText">
      <LinkDefault className="buttonText__link" {...rest}>
        {children}
      </LinkDefault>
    </div>
  );
};

export default ButtonText;
