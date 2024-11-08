"use client";
import Image from "next/image";
import Link from "next/link";
import {
  calendarImage,
  dining,
  foodAndDrink,
  ShoppingBag,
} from "../utils/XmasImagePath";

export default function BottomButtonList() {
  const handleScroll = (e, nav) => {
    e.preventDefault();

    const targetElement = document.querySelector(`[id="${nav}"]`);

    if (targetElement) {
      // Check if smooth scrolling is supported
      if ("scrollBehavior" in document.documentElement.style) {
        // Use scrollIntoView for smooth scrolling on supported browsers
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Fallback for browsers that don’t support smooth scroll behavior
        const topOffset =
          targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 px-[20px] py-[16px]">
      <div className="flex flex-row gap-[4px]">
        {data.map((item) => (
          <Link
            key={item.nav}
            href={`#${item.nav.toLowerCase()}`}
            className="px-[12px] cursor-pointer py-[16px] w-full text-white rounded-[16px] bg-[#374957] flex flex-col items-center justify-center gap-[4px]"
            onClick={(e) => handleScroll(e, item.nav.toLowerCase())}
          >
            <Image src={item.icon} alt="" width={14} height={16} />
            <p className="capitalize text-white text-[13px] font-[500]">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const data = [
  {
    icon: calendarImage,
    title: "Events",
    nav: "events",
  },
  {
    icon: ShoppingBag,
    title: "Shopping",
    nav: "shopping",
  },
  {
    icon: foodAndDrink,
    title: "Food",
    nav: "Food & Drink",
  },
];
