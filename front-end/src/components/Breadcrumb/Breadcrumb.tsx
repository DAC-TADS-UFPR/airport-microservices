import "./Breadcrumb.scss";
import { FC, Fragment } from "react";
import Link from "next/link";
interface BreadcrumbItem {
  name: string;
  url: string;
}

type BreadcrumbProps = BreadcrumbItem[];

const BreadCrumb: FC<{ data: BreadcrumbProps }> = ({ data }) => {
  return (
    <div className="breadCrumb">
      <Link className="breadCrumb__link" href="/">
        Home
      </Link>
      {data?.length > 0 &&
        data?.map((link: any, i: number) => (
          <Fragment key={i + "breadCrumb"}>
            {link?.name && (
              <Link
                className="breadCrumb__link"
                href={`${link?.url}`}
                dangerouslySetInnerHTML={{ __html: link?.name }}
              />
            )}
          </Fragment>
        ))}
    </div>
  );
};
export default BreadCrumb;
