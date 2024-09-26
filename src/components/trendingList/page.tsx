import { getCategory } from "@/app/action";
import { ListItem } from "./ListItem";
import AdsBanner from "../adsBanner/page";
interface TrendingListProps {
  urlData?: any;
  urlTitle?: string;
}

const TrendingList = async ({ urlTitle, urlData }: TrendingListProps) => {

  const listData = await getCategory(urlData.includes('event-category-list')?'event-list':urlData);
  return (
    <div>
      <ListItem data={listData} urlTitle={urlTitle}></ListItem>
      <AdsBanner/>
    </div>
  );
};

export default TrendingList;

