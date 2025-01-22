'use client'
import React, { HTMLAttributes, HtmlHTMLAttributes, ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";
import { FaAddressBook } from "react-icons/fa";
import { AiFillCalendar } from "react-icons/ai";
import { FaPeopleLine } from "react-icons/fa6";
import classNames from "classnames";
import { ButtonProps } from "antd";
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import { CSSProperties } from "styled-components";
const ReactIconsTOSvg= ({icon,height,width,classNames}:{icon:any,height?:string,width?:string,classNames:string}) => {
  // Convert the React icon to an inline SVG string
  
  if(!icon.props)
  {
     return  <Image src={""}  alt="React Icon" className={classNames} width={500} height={80} />

  }
  icon.props.style.padding="0px"
//  icon.props.viewBox="0 0  440"

  const svgMarkup = ReactDOMServer.renderToStaticMarkup(icon);
  const base64SVG = `data:image/svg+xml;base64,${Buffer.from(svgMarkup).toString("base64")}`;

  return (
    <>
     
      <Image src={base64SVG}  alt="React Icon" className={classNames}  width={16} height={16} />
      </>
  );
};

export default ReactIconsTOSvg;
