import { getCategory } from "@/app/action";
import { ListItem } from "@/components/trendingList/ListItem";
export const maxDuration = 300;
import "@/app/globals.css";
export default async function page() {
  const listData = await getCategory("activity-list");

  return (
    <div>
      <ListItem data={listData} urlTitle={"Activity Categories"}></ListItem>
    </div>
  );
}
