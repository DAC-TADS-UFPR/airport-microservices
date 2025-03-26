import { getStrData } from "@/data/config/api";

const StructureData = async ({ id }: { id: number }) => {
  const queryKey = ["structureData", id];
  const data = await getStrData({ queryKey });

  return <div dangerouslySetInnerHTML={{ __html: data || "" }} />;
};

export default StructureData;
