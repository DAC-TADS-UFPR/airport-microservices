import "./Footer.scss";
import { FC } from "react";
import Link from "next/link";
import TextDefault from "@/components/TextDefault/TextDefault";

const Footer: FC = () => {
  return (
    <section className="footer">
      <div className="footer__container">
        <div className="footer__links">
          <Link href={""} target="_blank" className="footer__link">
            {"Links"}
            {/* <ImgDefault className="footer__linkIcon" src={""} alt="" /> */}
          </Link>
        </div>
        <div className="footer__copy">
          <TextDefault className="footer__copyTitle">{"@2024 Copy - CNPJ  XX.XXX.XXX/0001-ZZ"}</TextDefault>
          <div className="footer__domaContainer">
            <TextDefault className="footer__doma">{"Feito por: "}</TextDefault>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
