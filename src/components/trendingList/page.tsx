
import { getApi} from "@/app/action";
import { ListItem } from "./ListItem";
interface TrendingListProps {
  urlData?: any;
  urlTitle?: string;
}

const TrendingList= async({ urlTitle, urlData }:TrendingListProps) => {
      const listData = await getApi(urlData)
  return (
    <div>
         <ListItem data={listData} urlTitle={urlTitle}></ListItem>
    </div>
  );
};

 
export default TrendingList;

  