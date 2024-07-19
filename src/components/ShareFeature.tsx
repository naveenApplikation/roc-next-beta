'use  client'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {FacebookShareButton,FacebookIcon, WhatsappShareButton,WhatsappIcon, TelegramIcon, TelegramShareButton, LinkedinShareButton, RedditShareButton, LinkedinIcon, PinterestIcon, PinterestShareButton, RedditIcon, TwitterIcon, TwitterShareButton} from 'next-share'
import styled from 'styled-components'
import { usePathname } from 'next/navigation'
import { useMyContext } from '@/app/Context/MyContext'
 import { createGlobalStyle } from 'styled-components';
 
import { ShareSocial } from "react-share-social"; 
interface Props{
    screenWidth?:any
}
const Container = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  padding: 24px 15px;

  .makeStyles-copyContainer-5 {
      height: 50px;
  }
  @media screen and (max-width: 400px) {
    gap: 18px;
  }

  @media screen and (max-width: 400px) {
    .makeStyles-copyUrl-6 {
      font-size: 11px;
    }
    .makeStyles-copyContainer-5 {
      height: 40px;
    }
  }
`;

const GlobalStyle = styled.span`
   ::-webkit-scrollbar {
    display: none;
  }
    p{
      color:blue
    }
      width:inherit;
  
`;

const ShareFeature:React.FC<Props>=({screenWidth})=>{

  const style = {
    root: {
      background: "black",
      borderRadius: 3,
      border: 0,
      color: "white",
      padding: "0px",
      display: "flex",
    },
    copyContainer: {
      border: "1px solid blue",
      background: "rgb(0,0,0,0.7)",
      height:"40px"
    },
    title: {
      color: "aquamarine",
      fontStyle: "italic",
    },
  };

    
   console.log(window.location.hostname,window.location.host)
   const url = window.location.href.toString()
   const element = useRef<HTMLDivElement>(null);
     const { handleSocialShare } = useMyContext();
   const[shareButtonsize,setSize]=useState(40)
    useEffect(()=>{
      
          if(window.innerWidth<400)
          {
             setSize(30) 
          }
          else
          {
              setSize(40)
          }
    },[screenWidth])
    useEffect(() => {
    
      const handler = (event: any) => {
        if (!element.current) {
          return;
        }
        if (!element.current.contains(event.target)) {
          handleSocialShare(true);
        }
      };

      document.addEventListener("click", handler, true);
      return () => {
        document.removeEventListener("click", handler);
      };
    }, []);
  return (
    <>
      <Container ref={element} className="social">
        <FacebookShareButton url={url}>
          <FacebookIcon size={shareButtonsize} round />
        </FacebookShareButton>

        <WhatsappShareButton url={url}>
          <WhatsappIcon size={shareButtonsize} round></WhatsappIcon>
        </WhatsappShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon size={shareButtonsize} round />
        </TelegramShareButton>
        <TwitterShareButton
          url={url}
        >
          <TwitterIcon size={shareButtonsize} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={shareButtonsize} round />
        </LinkedinShareButton>
        <RedditShareButton url={url}>
          <RedditIcon size={shareButtonsize} round />
        </RedditShareButton>
        <GlobalStyle>
          <ShareSocial url={url} socialTypes={[]} style={{ ...style }} />
        </GlobalStyle>
      </Container>
    </>
  );
}

export default ShareFeature