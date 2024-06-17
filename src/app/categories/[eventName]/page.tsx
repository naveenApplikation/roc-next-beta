import { getApi } from "@/app/action"
import CategoriesPage from "@/components/categoriesPage"

 
  
interface Props{
    params:{
        eventName:string
    },
    searchParams:{
       search:string
    }
}
async function Page({params,searchParams}:Props){
        console.log(params)
        console.log(searchParams)
        const data=await getApi(searchParams.search)
        console.log(data)

        return <>
          <CategoriesPage params={params.eventName} searchParams={searchParams.search} data={data}></CategoriesPage>
         </>
}

const params = [
  { params: "Enjoy the sunshine"},
  { params: "Events" },
];


export async function generateStaticParams()
{
       return params.map((item)=>{
          return {eventName:item.params}
       })
}

export default Page
