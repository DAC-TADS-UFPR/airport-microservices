import "./ButtonLink.scss";
import { FC } from "react";
import Link, { LinkProps } from "next/link";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

type Props = {
  children?: string;
  target?: string;
} & LinkProps &
  React.ComponentProps<"a">;

const ButtonLink: FC<Props> = ({ children, ...rest }) => {
  return (
    <div className="buttonLink">
      <LinkDefault className="buttonLink__link" {...rest}>
        {children}
      </LinkDefault>
    </div>
  );
};

export default ButtonLink;
