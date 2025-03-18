import { getAds, getAdsByCategory, getCategory, getfilteredAdsByCategory } from "@/app/action";
import { ListItem } from "@/components/trendingList/ListItem";
export const maxDuration = 300;
import "@/app/globals.css";
import AdsBanner from "@/components/adsBanner/page";
import BannerModal from "@/components/bannerModal/page";
export default async function page() {
  const listData = await getCategory("activity-list");
   const arrangingAds:any=await getfilteredAdsByCategory("activityCategory")
   
  return (
    <div>
      <ListItem data={listData} urlTitle={"Activity Categories"}></ListItem>
      <AdsBanner adsData={arrangingAds} />
      <BannerModal />
    </div>
  );
}
