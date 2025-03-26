import { FC } from "react";
import { getH1 } from "@/data/config/api";

const H1Hidden: FC<{ id: number; title: string }> = async ({ id, title }) => {
  const h1 = await getH1(id);

  return (
    <h1 style={{ visibility: "hidden", height: 0, width: 0 }}>{h1 || title}</h1>
  );
};

export default H1Hidden;
