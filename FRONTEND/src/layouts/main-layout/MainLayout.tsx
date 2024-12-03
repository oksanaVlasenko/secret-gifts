import LanguageChange from "@/components/languages-change/LanguageChange";
import UserAccount from "@/components/userAccount/userAccount";
import { GiftIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import './mainLayout.scss'

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className='logo'>
        <Link to='/'>
          <GiftIcon className='logo-icon'/>
        </Link>
        
        <div className="layout-icons">
          <LanguageChange />
          <UserAccount />
        </div>
      </div>
      
      <main>
        {children} 
      </main>
    </div>
  );
};

export default MainLayout;
