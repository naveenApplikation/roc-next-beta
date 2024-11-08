import "./style.css";
import "@/app/tailwind.css";
import ScrollLayout from "./XmasComponents/ScrollLayout";
import { LogoNew, MenuIcon } from "../utils/ImagePath";
import Image from "next/image";
import {
  EventLayout,
  RocLogoIcon,
  ShoppingLayout,
  winterDomes,
  XmasBgImage,
} from "./utils/XmasImagePath";
import { url } from "inspector";
import Carousel from "./XmasComponents/CarouselScreen";
import { getCarouselData } from "./XmasAction";
import XmasDashboard from "./XmasComponents/XmasDashBoard";
import DashBoardModalScreen from "@/components/dashboard/DashBoardModalScreen";
export const maxDuration = 300;

export default async function Layout({ children }: { children: any }) {
  const data: any = await getCarouselData();

  const slides = [
    {
      image: XmasBgImage,
    },
    {
      image: ShoppingLayout,
    },
    {
      image: EventLayout,
    },
  ];
  return (
    <>
      <div className="min-[800px]:hidden fixed z-[1] top-0 h-screen bg-white w-full"></div>

      <Carousel slides={data}></Carousel>

      <ScrollLayout>
        <XmasDashboard></XmasDashboard>
      </ScrollLayout>

      {children}
      <DashBoardModalScreen></DashBoardModalScreen>
    </>
  );
}
