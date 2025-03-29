"use client";
import React, { FC } from "react";
import Link, { LinkProps } from "next/link";
import { getPath } from "@/utils/getPath";

interface LinkDefaultProps extends Omit<React.ComponentProps<"a">, "href">, LinkProps {
  href: string;
}

const LinkDefault: FC<LinkDefaultProps> = ({ href, ...props }) => {
  return <Link href={`${getPath(href)}`} {...props} />;
};

export default LinkDefault;
