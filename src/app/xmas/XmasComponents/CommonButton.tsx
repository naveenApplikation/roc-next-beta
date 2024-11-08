"use client";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

export default function CommonButton({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) {
  const route = useRouter();
  return (
    <>
      <button
        onClick={() => route.push("/eventCategory/xmas-events")}
        className="text-white w-full bg-[#F40035] text-[14px] font-[600] rounded-[8px] px-[16px] py-[12px]"
      >
        {children}
      </button>
    </>
  );
}
