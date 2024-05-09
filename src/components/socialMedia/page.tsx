import { Facebook, Instagram, Linkedin,  TwitterIcon } from '@/app/utils/ImagePath';
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
    return (
        <SocialMediaContent>
            <Linkedin />
            <Instagram />
            <Facebook />
            <TwitterIcon />
        </SocialMediaContent>
    );
};

export default SocialMedia;