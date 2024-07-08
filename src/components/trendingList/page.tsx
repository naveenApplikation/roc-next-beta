import { getCategory } from "@/app/action";
import { ListItem } from "./ListItem";
interface TrendingListProps {
  urlData?: any;
  urlTitle?: string;
}

const TrendingList = async ({ urlTitle, urlData }: TrendingListProps) => {
  const listData = await getCategory(urlData);
  return (
    <div>
      <ListItem data={listData} urlTitle={urlTitle}></ListItem>
    </div>
  );
};

export default TrendingList;

