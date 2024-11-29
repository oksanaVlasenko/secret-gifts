import { GiftIcon } from '@heroicons/react/20/solid';

import './loader.scss'

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = true }) => {
  const icons = [
    { Icon: GiftIcon, animation: "[animation-delay:-0.3s]", color: "text-[#D49A7A]" },
    { Icon: GiftIcon, animation: "[animation-delay:-0.15s]", color: "text-[#9B0D0F]" },
    { Icon: GiftIcon, animation: "", color: "text-[#6B8063]" },
  ];

  return (
    <div
      className={`
        ${fullScreen ? "loader-fullscreen" : "relative"} 
        ${fullScreen ? "bg-[#FEF7FE]" : ""}`
      }
    >
      <span className='sr-only'>Loading...</span>
      
      <div className="flex space-x-4">
        {icons.map(({ Icon, animation, color }, index) => (
          <Icon 
            key={index} 
            className={`h-10 w-10 animate-bounce ${color} ${animation}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
