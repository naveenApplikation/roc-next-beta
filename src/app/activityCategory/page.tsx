import { getCategory } from "@/app/action";
import { ListItem } from "@/components/trendingList/ListItem";
export const maxDuration = 60;
import "@/app/globals.css";
import AdsBanner from "@/components/adsBanner/page";
import BannerModal from "@/components/bannerModal/page";
export default async function page() {
  const listData = await getCategory("activity-list");

  return (
    <div>
      <ListItem data={listData} urlTitle={"Activity Categories"}></ListItem>
      <AdsBanner/>
      <BannerModal />
    </div>
  );
}
