import "./page.scss";
import SectionOne from "@/modules/home/SectionOne/SectionOne";
import StructureData from "@/components/SEO/StructureData/StructureData";
import MainDefault from "@/components/Main/Main";

export default function Home() {
  return (
    <MainDefault id="home">
      {/* <StructureData id={2} /> */}
      <SectionOne />
    </MainDefault>
  );
}
