import UserAccount from "@/components/userAccount/userAccount";
import { GiftIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

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
        
        <UserAccount />
      </div>
      
      <main>
        {children} {/* Тут відображатимуться вкладені маршрути, наприклад, Login або Unauthorized */}
      </main>
    </div>
  );
};

export default MainLayout;
