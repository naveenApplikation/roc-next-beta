import { getCategory } from "@/app/action";
import { ListItem } from "@/components/trendingList/ListItem";
export const maxDuration = 300;
import "@/app/globals.css";
import AdsBanner from "@/components/adsBanner/page";
export default async function page() {
  const listData = await getCategory("event-list");

  return (
    <div>
      <ListItem data={listData} urlTitle={"Event Categories"}></ListItem>
      <AdsBanner />
    </div>
  );
}
