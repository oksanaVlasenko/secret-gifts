import { GiftIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className='logo'>
        <GiftIcon className='logo-icon'/>
      </div>
      
      <main>
        {children} {/* Тут відображатимуться вкладені маршрути, наприклад, Login або Unauthorized */}
      </main>
    </div>
  );
};

export default MainLayout;
