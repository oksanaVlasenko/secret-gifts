import { useEffect, useState } from "react";
import DesktopFilters from "./DesktopFilters"
import MobileFilters from "./MobileFilter"


const GeneralFilters: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); 
    };

    checkScreenSize(); 
    window.addEventListener('resize', checkScreenSize); 

    return () => {
      window.removeEventListener('resize', checkScreenSize); 
    };
  }, []);
  
  return (
    <div>
      {isMobile ? (
        <MobileFilters />
      ) : (
        <DesktopFilters />
      )}
    </div>
  )
}

export default GeneralFilters