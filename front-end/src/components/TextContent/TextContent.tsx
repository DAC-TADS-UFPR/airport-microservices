import "./TextContent.scss";
import { FC } from "react";

type Prop = React.ComponentProps<"div"> & { text?: string };

const TextContent: FC<Prop> = ({ text, children, ...props }) => {
  return <div className="textContent" dangerouslySetInnerHTML={{ __html: text || children || "" }} {...props} />;
};

export default TextContent;
