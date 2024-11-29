import { GiftIcon } from "@heroicons/react/16/solid";
import { Outlet } from "react-router-dom"; // імпортуємо Outlet для відображення вкладених маршрутів

const AuthLayout: React.FC = () => {
  return (
    <div>
      <div className='logo'>
        <GiftIcon className='logo-icon'/>
      </div>
      
      <main>
        <Outlet /> {/* Тут відображатимуться вкладені маршрути, наприклад, Login або Unauthorized */}
      </main>
    </div>
  );
};

export default AuthLayout;
