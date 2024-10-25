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
    router.push("/");
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

          {pathname === "/"  || pathname?.includes('info') || pathname?.includes('home')? (
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
          ) : (
            <>
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FSearch.png?alt=media&token=ab70ea3f-201d-4b55-b376-67cfd8fdea39"
                }
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={() => modalClick("search")}
              />
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fuser.png?alt=media&token=5239ce4e-da6f-4159-ae01-90dce6bed1ad"
                }
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={() => modalClick("createAccountModal")}
              />
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fhome.png?alt=media&token=6297f249-2900-4f3b-965a-43016b573bde"
                }
                width={24}
                height={24}
                alt="Logo Outline"
                onClick={navigateClick}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
