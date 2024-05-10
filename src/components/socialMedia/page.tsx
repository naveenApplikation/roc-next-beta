import { Facebook, Instagram, Linkedin, TwitterIcon } from '@/app/utils/ImagePath';
import { facebookURL, instagramURL, linkedinURL, twitterURL } from '@/app/utils/constantData';
import React from 'react';
import styled from 'styled-components';

interface SocialMediaProps {
  // Define your props here
}

const SocialMediaContent = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  padding: 16px 24px;
  gap: 24px;
  margin-top:15px;
  svg{
    height:32px;
    width:32px;
  }
`;

const SocialMedia: React.FC<SocialMediaProps> = (props) => {

  const navigateClick = (url: string) => {
    window.open(url)
  }
  return (
    <SocialMediaContent>
      <Linkedin onClick={() => navigateClick(linkedinURL)} />
      <Instagram onClick={() => navigateClick(instagramURL)} />
      <Facebook onClick={() => navigateClick(facebookURL)} />
      <TwitterIcon onClick={() => navigateClick(twitterURL)} />
    </SocialMediaContent>
  );
};

export default SocialMedia;