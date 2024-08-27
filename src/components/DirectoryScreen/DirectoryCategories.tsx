import { getDirectoryCategories } from "@/app/action";
import { ListItem } from "../trendingList/ListItem";

interface TrendingListProps {
  urlData?: any;
  urlTitle?: string;
}

const DirectoryCatories: React.FC<TrendingListProps> = async ({
  urlTitle,
  urlData,
}) => {
  const listData = await getDirectoryCategories(urlData);
  console.log(listData);
  return (
    <>
      <ListItem data={listData} urlTitle={urlTitle}></ListItem>
    </>
  );
};

export default DirectoryCatories;
