import { FC } from "react";

interface SectionOneProps {
  data: any;
}

const SectionOne: FC<SectionOneProps> = ({ data }) => {
  return (
    <div className="sectionOne">
      <div className="sectionOne__container"></div>
    </div>
  );
};

export default SectionOne;
