import { getData, getBookMark, getAds, getAdsByCategory } from "@/app/action";
import EventList from "@/components/screenPage";
import { cookies } from "next/headers";
import "@/app/globals.css";
import PlaceList from "../../components/PlacesList";
import '@/app/tailwind.css'
export const maxDuration = 300;
interface Props {
  params: {
    listName: string,
    categoryId: string
  }
}
export default async function Page({ params }: Props) {
  const data = await getData(params.listName, params.categoryId);

  const token = cookies().get("loginToken")?.value;

  let bookmark = false;
  if (token) {
    const res = await getBookMark("bookmark");
    const category = params.listName
      .replaceAll("%20", " ")
      .replaceAll("%26", " ");
    res?.bookmarks?.forEach((item: any) => {
      if (item.listName.includes(category)) {
        bookmark = true;
      }
    });
  }


  const adsData = await getAds()

  const adsDataByCategory = await getAdsByCategory() as { data: any }

  const filterCategoryHaveAds = adsDataByCategory?.data?.find((item) => {
    return item['Category ID'] == params.categoryId
  })
 
  const getFilteredAds = () => {
    if (!filterCategoryHaveAds) {
      return [...adsData.data]
    }
    else {
      const arrangingAds: any[] = []
      filterCategoryHaveAds?.ad_ids.split(',').forEach((rowId) => {
        adsData.data.forEach((item) => {
          if (rowId == item.ad_id) {
            arrangingAds.push(item)
          }
        })
      })
      return arrangingAds
    }
  }
  const arrangingAds = getFilteredAds()
 

  return (
    <>
      <PlaceList data={data} adsData={arrangingAds} bookmarkValue={bookmark}></PlaceList>

      {/* <BannerModal /> */}
    </>
  );
}
