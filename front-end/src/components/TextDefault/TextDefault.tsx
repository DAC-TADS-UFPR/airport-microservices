import { FC } from "react";
type Prop = React.ComponentProps<"p"> & { text?: string };

const TextDefault: FC<Prop> = ({ text, children, ...props }) => {
  return <div style={{ display: "inline" }} dangerouslySetInnerHTML={{ __html: text || children || "" }} {...props} />;
};

export default TextDefault;
