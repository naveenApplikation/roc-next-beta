import React, { useEffect, useState } from "react";
import MyListModalLayout from "@/components//modal/Modal";
import styled from "styled-components";
import { useMyContext } from "@/app/Context/MyContext";

interface DashboardSearchContainerProps {
  showMap: boolean;
}
const Content=styled.p`
  margin-top:5px;
`
const List=styled.ul`
   padding:20px
`
const Title=styled.h3`
margin-top:5px;
`
const PrivacyPolicy: React.FC<DashboardSearchContainerProps> = ({
  showMap,
}) => {
  const { closeModal, modalType } = useMyContext();
   console.log(modalType.privacyPolicy,14)
  return <>
      <MyListModalLayout
        isOpen={modalType.privacyPolicy}
        onClose={() => closeModal("privacyPolicy")}
        {...{ showMap }}
        title="Privacy Policy"
        name="privacyPolicy"
      >
        <SearchedContainer>
        <div style={{fontSize:"16px",lineHeight:"20px"}}>
      
        <Title>Introduction</Title>
        <Content>Roc.je ("we", "our", "us") takes your privacy very seriously. This Privacy Notice details what personal data we collect and how we use it. Please read this Privacy Notice and ensure you understand its contents.</Content>

        <Title>Changes to this Privacy Notice</Title>
        <Content>We continually review our Privacy Notice and update it as necessary. We advise regularly checking our Privacy Notice for updates. Roc.je will inform you of significant changes to our policy.</Content>

        <Title>Your Personal Data – What Is It?</Title>
        <Content>Personal data relates to information about a living individual who can be identified from that data. Identification can be by the information alone or in conjunction with other information in the data controller’s possession. From 25 May 2018, the processing of personal data is governed by the General Data Protection Regulation (GDPR). In the event of changes to jurisdiction, such as the United Kingdom leaving the European Union, the processing of personal data shall be governed by the applicable local legislation.</Content>

        <Title>Our Name & Contact Details</Title>
        <Content>The Data Controller of your personal data is Roc.je. This means Roc.je decides how your personal data is processed and for what purposes.</Content>
        <Content>Our contact details are:</Content>
        <Content>
            Simon Soar<br/>
            Mariposa<br/>
            8 Highfield Estate<br/>
            Simon Soar<br/>
            La Route du Petit Clos<br/>
            St Helier <br/>
            JE23FD
        </Content>

        <Title>Data Protection Officer Contact Details</Title>
        <Content>Should you wish to contact our Data Protection Officer regarding a data protection matter, you can do so by emailing [your email here] or writing to:</Content>
        <Content>
            Simon Soar<br/>
            Mariposa<br/>
            8 Highfield Estate<br/>
            Simon Soar<br/>
            La Route du Petit Clos<br/>
            St Helier<br/>
            JE23FD  
        </Content>

        <Title>What Are Our Legitimate Interests for Processing Your Data?</Title>
        <Content>Where we have used legitimate interest as the lawful basis for processing your personal data, we may use your personal data to:</Content>
        <List>
            <li>Direct market products and services to you via post, email, telephone, SMS text, and push notifications</li>
            <li>Maintain our accounts and records, including recording contact with you</li>
            <li>Prevent, detect, and investigate fraud or crime</li>
            <li>Fulfil statutory or regulatory obligations</li>
            <li>Resolve complaints and/or disputes</li>
            <li>Collect payments or arrears</li>
            <li>Protect our organisation and stakeholders</li>
            <li>Conduct reporting, analytics, and product/service improvement</li>
            <li>Improve data accuracy or completeness</li>
            <li>Track your email engagement</li>
            <li>Personalise your online experience</li>
            <li>Conduct market research</li>
        </List>

        <Title>Sharing Your Personal Data</Title>
        <Content>Roc.je may share your personal data internally and externally. Where we choose to share your information, we shall do so for the following reasons:</Content>
        <List>
            <li>With your consent</li>
            <li>To fulfil contracted services or products</li>
            <li>To comply with legal obligations</li>
            <li>For legitimate interests, such as those listed above</li>
            <li>With third parties for products or services beneficial to you, with your consent</li>
            <li>To protect our rights, property, or safety</li>
            <li>For business transactions like sales or reorganisations</li>
            <li>For reporting, analytics, and service improvement across our organisation</li>
        </List>
        <Content>Our partners and service providers must:</Content>
        <List>
            <li>Abide by relevant data protection legislation</li>
            <li>Treat your information with care</li>
            <li>Use the information only for specified purposes</li>
            <li>Allow us to check their compliance</li>
        </List>

        <Title>Digital Marketing Service Providers</Title>
        <Content>We may use digital marketing agents like Google Analytics and HotJar for marketing activities. Our appointed data processors will comply with data protection laws.</Content>

        <Title>International Personal Data Transfer</Title>
        <Content>Roc.je currently does not transfer personal data outside the EU. If this changes, we will ensure appropriate safeguards are in place.</Content>

        <Title>Personal Data Retention Period</Title>
        <Content>Roc.je has the following data retention policies:</Content>
        <List>
            <li>Statutory retention periods (e.g., financial data for 7 years)</li>
            <li>Contractual data for 7 years</li>
            <li>Contact details for marketing purposes for 7 years, or until consent is withdrawn</li>
            <li>Downloaded content data for 7 years</li>
        </List>
        <Content>When data is no longer needed, it will be erased or anonymised securely.</Content>

        <Title>Your Rights</Title>
        <Content>You have the following rights regarding your personal data:</Content>
        <List>
            <li>Right to be informed</li>
            <li>Right of access</li>
            <li>Right to rectification</li>
            <li>Right to erasure</li>
            <li>Right to restrict processing</li>
            <li>Right to object to processing</li>
            <li>Right to data portability</li>
        </List>
        <Content>To exercise your rights, contact our Data Protection Officer by emailing [your email here] or writing to:</Content>
        <Content>
            Simon Soar<br/>
            Mariposa<br/>
            8 Highfield Estate<br/>
            Simon Soar<br/>
            La Route du Petit Clos<br/>
            St Helier<br/>
            JE23FD
        </Content>

        <Title>Your Right to Withdraw Consent</Title>
        <Content>You can withdraw your consent for processing your data at any time. Contact our Data Protection Officer to do so.</Content>

        <Title>Automated Decision-Making, Including Profiling</Title>
        <Content>Roc.je does not currently use automated decision-making or profiling in the processing of your personal data.</Content>

        <Title>Your Right to Lodge a Complaint with the ICO</Title>
        <Content>You have the right to lodge a complaint with the Jersey Data Protection Authority. Prior to lodging a complaint, please contact our Data Protection Officer to address any concerns. If unresolved, you can lodge a complaint with the Information Commissioner’s Office in Jersey.</Content>

        <Content>Contact Information:</Content>
        <Content>
            Roc.je<br/>
            Mariposa<br/>
            8 Highfield Estate<br/>
            Simon Soar<br/>
            La Route du Petit Clos<br/>
            St Helier<br/>
            JE23FD
        </Content>
 </div>
        </SearchedContainer>
      </MyListModalLayout>

    </>
  
};

export default PrivacyPolicy;

const SearchedContainer = styled.div`
  background-color: #fff;
  padding: 20px 25px;
  color:black;
  border-radius: 24px 24px 0px 0px;
  transition: 5s;
  min-height: 100vh;
  @media screen and (max-width: 800px) {
    box-shadow: none;
    background-color: transparent;
    padding: 0px 15px;
  }

  .ant-segmented {
    width: 100%;
    min-height: 32px;
    padding: 3px;
    background-color: #7676801f;
  }
  .filterInput {
    padding: 0px;
    box-shadow: 0px 0px 0px 0px #5229001a;
    box-shadow: 0px 9px 21px 0px #5229001a;
    margin: 15px 0px;
  }
  .ant-segmented-item {
    flex-grow: 1;
  }
  :where(.css-dev-only-do-not-override-1rqnfsa).ant-segmented
    .ant-segmented-item-selected {
    border-radius: 7px;
    box-shadow: 0px 3px 8px 0px #0000001f;
  }
  .ant-segmented-item-label {
    font-size: 13px;
    font-weight: 500;
  }
  .ant-segmented-item-selected .ant-segmented-item-label {
    font-weight: 600;
  }
`;
