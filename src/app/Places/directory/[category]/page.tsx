
import NotFound from "@/app/not-found";
import { ListItem } from "@/components/trendingList/ListItem";
import AdsBanner from "@/components/adsBanner/page";
import BannerModal from "@/components/bannerModal/page";
import { getAds, getAdsByCategory, getDirectoryCategories } from "@/app/action";
export const maxDuration = 300;
interface Props {
   params: {
      category: string,

   }
}
export default async function Page({ params }: Props) {
   console.log("in places")
   const data = await getDirectoryCategories(params.category.replaceAll("%20", " "));
   if (!data) {
      return <>
         <NotFound></NotFound>
      </>
   }

   const adsData = await getAds()
   const adsDataByCategory = await getAdsByCategory() as { data: any }

   const filterCategoryHaveAds = adsDataByCategory?.data?.find((item) => {
      return item?.Title == params.category.replace("%20", "")
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
   

   return <>

      <ListItem data={data} urlTitle={params.category.replaceAll("%20", " ")}></ListItem>
      <AdsBanner adsData={arrangingAds} />
      <BannerModal />

   </>
}


