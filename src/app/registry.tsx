"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";

const theme = {
    colors: {
      Main: "#00737F",
      lightGrey: "#959595",
    },
    fontSize: {
      default: "1.6rem",
      normal: "1.4rem",
      smallText: "1.2rem",
      mediumText: "1.8rem",
      largeText: "2.4rem",
      logininfoText: "2rem",
      ClientParticipantsCount: "4rem",
      small: "1rem",
    },
    fontWeight: {
      normal: "600",
    },
    backgroundColor: {
      heading: "#fff",
      text: "#fff",
      border: "#D9D9D9",
      Inputbackground: "#F5F5F5",
    },
    media: {
      mobile: "700px",
      tab: "950px",
    },
  };

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}
