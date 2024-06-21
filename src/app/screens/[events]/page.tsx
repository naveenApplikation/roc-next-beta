import { getData } from "@/app/action";
import EventList from "@/components/screenPage";

interface Props {
  params: {
    events: string;
  };
  searchParams: {
    categoryID: string;
  };
}


async function Page({ params, searchParams }: Props) {
  console.log(params);
  console.log(searchParams.categoryID);
  const data =await getData(params.events,searchParams.categoryID);
 
  return (
    <>
      <EventList
         data={data}
      ></EventList>
    </>
  );
}



// const params = [{ params: "Dine out" }, { params: "Pubs" }];


// export async function generateStaticParams(){
//         return params.map((item) => {
//           return { events: item.params };
//         });
// }


export default Page;