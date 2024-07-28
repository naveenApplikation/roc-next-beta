"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="3px"
        color="#2299dd"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarProvider;
