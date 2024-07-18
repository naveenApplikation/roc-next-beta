'use  client'
import React, { forwardRef, useEffect, useRef } from 'react'
import {FacebookShareButton,FacebookIcon, WhatsappShareButton,WhatsappIcon, TelegramIcon, TelegramShareButton, LinkedinShareButton, RedditShareButton, LinkedinIcon, PinterestIcon, PinterestShareButton, RedditIcon, TwitterIcon, TwitterShareButton} from 'next-share'
import styled from 'styled-components'
import { usePathname } from 'next/navigation'
import { useMyContext } from '@/app/Context/MyContext'
 import { createGlobalStyle } from 'styled-components';
 
import { ShareSocial } from "react-share-social"; 
const Container=styled.div`
   
    display:flex;
    gap:30px;
    width:100%;
    height:100%;
    flex-wrap:wrap;
    padding: 24px 15px;   
`
const style = {
  root: {
    background: "black",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding:"0px",
    display:"flex",
   
  },
  copyContainer: {
    border: "1px solid blue",
    background: "rgb(0,0,0,0.7)",
  },
  title: {
    color: "aquamarine",
    fontStyle: "italic",
  },
};

const GlobalStyle = styled.span`
   ::-webkit-scrollbar {
    display: none;
  }
    p{
      color:blue
    }
      width:inherit;
  
`;

const ShareFeature =forwardRef(function ShareFeature({ref}:{ref:any}){
    
   console.log(window.location.hostname,window.location.host)
   const url = window.location.href.toString()
   const element = useRef<HTMLDivElement>(null);
     const { handleSocialShare } = useMyContext();
  
 
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
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <WhatsappShareButton url={url}>
          <WhatsappIcon size={40} round></WhatsappIcon>
        </WhatsappShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon size={40} round />
        </TelegramShareButton>

        <TwitterShareButton
          url={url}
          title={
            "next-share is a social share buttons for your next React apps."
          }
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
        <RedditShareButton url={url}>
          <RedditIcon size={40} round />
        </RedditShareButton>
        <GlobalStyle>
          <ShareSocial url={url} socialTypes={[]} style={{ ...style }} />
        </GlobalStyle>
      </Container>
    </>
  );
})

export default ShareFeature