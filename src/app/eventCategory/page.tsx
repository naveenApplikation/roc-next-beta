import { getCategory } from "@/app/action";
import { ListItem } from "@/components/trendingList/ListItem";
export const maxDuration = 300;

export default async function page() {
  const listData = await getCategory("event-list");

  return (
    <div>
      <ListItem data={listData} urlTitle={"Event Categories"}></ListItem>
    </div>
  );
}
