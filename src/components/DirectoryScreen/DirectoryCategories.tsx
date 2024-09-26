import { getDirectoryCategories } from "@/app/action";
import { ListItem } from "../trendingList/ListItem";
import AdsBanner from "../adsBanner/page";
import BannerModal from "../bannerModal/page";

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
      <AdsBanner />
      <BannerModal />
    </>
  );
};

export default DirectoryCatories;
