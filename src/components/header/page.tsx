import { home, logoOutline, mapIcon, profileIcon, search, user } from '@/app/utils/ImagePath';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import CreateAccountModalLayout from "../modal/Modal";
import CreateAccountContent from '@/app/dashboard/Menu Modal Contents/CreateAccount';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
    // Define your props here
    setCreateAccountModal?: Function,
    createAccountModal?: boolean,
    modalClick : Function;
}

const HeadMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
    display: none;
  }
`;
const HeaderMapProfileContainer = styled.div`
  display: flex;
  align-items:center;
  gap: 16px;
`;



const Header: React.FC<HeaderProps> = ({modalClick}) => {
    const [createAccountModal, setCreateAccountModal] = useState<boolean>(false)
    const pathname = usePathname()
    const router = useRouter()

    const opencreateAccountHandle = () => {
        setCreateAccountModal(true);
    };
    const closecreateAccountHandle = () => {
        setCreateAccountModal(false);
    };
    const navigateClick =()=>{
        router.push("/")
    }


    return (
        <>
            <HeadMenu>
                <Image
                    style={{ width: "92px", height: "37.77px" }}
                    src={logoOutline}
                    alt="Logo Outline"
                    onClick={navigateClick}
                />
                <HeaderMapProfileContainer>
                    {
                        pathname === "/" ?
                            <>
                                <Image
                                    style={{ width: "48px", height: "48px" }}
                                    src={mapIcon}
                                    alt="Logo Outline"
                                />
                                <Image
                                    style={{ width: "48px", height: "48px", cursor: "pointer" }}
                                    src={profileIcon}
                                    alt="Logo Outline"
                                    onClick={()=>modalClick("createAccountModal")}
                                />
                            </> :
                            <>
                                <Image
                                    style={{ width: "24px", height: "24px" }}
                                    src={search}
                                    alt="Logo Outline"
                                />
                                <Image
                                    style={{ width: "24px", height: "24px" }}
                                    src={user}
                                    alt="Logo Outline"
                                />
                                <Image
                                    style={{ width: "24px", height: "24px" }}
                                    src={home}
                                    alt="Logo Outline"
                                /></>
                    }
                </HeaderMapProfileContainer>
            </HeadMenu>
            <CreateAccountModalLayout
                isOpen={createAccountModal}
                onClose={closecreateAccountHandle}
                title="Create an account"
            >
                <CreateAccountContent />
            </CreateAccountModalLayout>
        </>

    );
};

export default Header;