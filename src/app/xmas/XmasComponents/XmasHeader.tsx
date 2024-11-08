"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useMyContext } from "@/app/Context/MyContext";
import {
  profileIconDark,
  ROCLogo,
  HamburgerDesktop,
  iconbetablack,
} from "@/app/utils/ImagePath";
 

const Header = () => {
  const { modalClick } = useMyContext();

  const pathname = usePathname();
  const router = useRouter();

  const navigateClick = () => {
    router.push("/xmas");
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // Prompt user to refresh
                if (confirm("New version available. Refresh to update?")) {
                  window.location.reload();
                }
              }
            });
          }
        });
      });
    }
  }, []);
  return (
    <>
     <div className="sticky top:0 flex items-center justify-between px-10 pt-8 pb-1 bg-transparent max-[800px]:hidden max-[800px]:px-4 max-[800px]:pt-10">

        <Image
          style={{ cursor: "pointer" }}
          src={ROCLogo}
          alt="Logo Outline"
          onClick={navigateClick}
        />
     <div className="flex items-center gap-4">

       
            <>
              {/* <Image
                src={iconbetablack}
                width={48}
                height={48}
                alt="Logo Outline"
                // onClick={() => modalClick("createAccountModal")}
              /> */}
              <Image
                style={{ cursor: "pointer" }}
                src={profileIconDark}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
              <HamburgerDesktop
                onClick={() => modalClick("LoginSignupModal")}
              />
            </>
          
        </div>
      </div>
    </>
  );
};

export default Header;
