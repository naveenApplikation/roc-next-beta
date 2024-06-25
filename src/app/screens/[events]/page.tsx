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
   
 
  const data = await getData(params.events, searchParams.categoryID);
  
  return (
    <>
      <EventList data={data}></EventList>
    </>
  );
}

const params = [
  "Dine out",
  "Pubs",
  "top attraction",
  "Beach life",
  "Sustainability",
  "Heritage",
  "Cocktail",
  "Surfing",
];

export async function generateStaticParams(){
        return params.map((params) => {
          return {events:params };
        });
}

export default Page;
