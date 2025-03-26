import "./ButtonLinkGray.scss";
import { FC } from "react";
import Link, { LinkProps } from "next/link";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

type Props = {
  children?: string;
  target?: string;
} & LinkProps &
  React.ComponentProps<"a">;

const ButtonLinkGray: FC<Props> = ({ children, ...rest }) => {
  return (
    <div className="buttonLinkGray">
      <LinkDefault className="buttonLinkGray__link" {...rest}>
        {children}
      </LinkDefault>
    </div>
  );
};

export default ButtonLinkGray;
