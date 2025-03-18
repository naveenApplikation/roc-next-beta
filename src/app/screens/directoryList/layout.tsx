import { getAds, getAdsByCategory } from "@/app/action";
import PageLayout from "@/app/pageLayout";
import AdsBanner from "@/components/adsBanner/page";

export default async function Layout({children}:{children:any})
{

          const adsData=await getAds();
         const adsDataByCategory=await getAdsByCategory() as {data:any}
           
             const filterCategoryHaveAds=adsDataByCategory?.data?.find((item)=>{
                 return item?.Title?.includes("directory")
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
     
    return <>
     <PageLayout>
       {children}
       <AdsBanner adsData={arrangingAds} ></AdsBanner>
     </PageLayout>
     
     
    </>

}