import { getAds, getAdsByCategory, getCategory } from "@/app/action";
import { ListItem } from "@/components/trendingList/ListItem";
import "@/app/globals.css";
import AdsBanner from "@/components/adsBanner/page";
import BannerModal from "@/components/bannerModal/page";
export const maxDuration = 300;

export default async function page() {
  const listData = await getCategory("event-list");
const adsData=await getAds()
        const adsDataByCategory=await getAdsByCategory() as {data:any}
      
        const filterCategoryHaveAds=adsDataByCategory?.data?.find((item)=>{
            return item?.Title?.includes("eventCategory")
        })
     
        const getFilteredAds=()=>{
            if(!filterCategoryHaveAds)
            {
               return [...adsData.data]
            }
            else
            {
              const arrangingAds:any[]=[]
              filterCategoryHaveAds?.ad_ids.split(',').forEach((rowId)=>{
                  adsData.data.forEach((item)=>{
                        if(rowId==item.ad_id)
                        {
                           arrangingAds.push(item)
                        }
                  })
             })
                 return arrangingAds
            }
        }
       const arrangingAds=getFilteredAds()

  return (
    <div>
      <ListItem  data={listData} urlTitle={"Event Categories"}></ListItem>
      <AdsBanner  adsData={arrangingAds}/>
      <BannerModal />
    </div>
  );
}
