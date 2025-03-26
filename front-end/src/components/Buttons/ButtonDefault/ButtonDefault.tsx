import "./ButtonDefault.scss";
import { FC } from "react";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

type Props = {
  data: { url?: string; title?: string; target?: string; name: string };
};

const ButtonDefault: FC<Props> = ({ data, ...rest }) => {
  if (!data) return;
  return (
    <>
      {data?.title && (
        <div className="buttonDefault">
          <LinkDefault
            href={data?.url || "#"}
            className="buttonDefault__link"
            target={data?.target}
            title={`Acessar ${data?.name}`}
            dangerouslySetInnerHTML={{ __html: data?.title }}
            {...rest}
          />
        </div>
      )}
    </>
  );
};

export default ButtonDefault;
