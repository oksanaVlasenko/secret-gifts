import { GiftIcon } from '@heroicons/react/20/solid';

import './loader.scss'

const TransparentLoader: React.FC = () => {
  const icons = [
    { Icon: GiftIcon, animation: "[animation-delay:-0.3s]", color: "text-[#D49A7A]" },
    { Icon: GiftIcon, animation: "[animation-delay:-0.15s]", color: "text-[#9B0D0F]" },
    { Icon: GiftIcon, animation: "", color: "text-[#6B8063]" },
  ];

  return (
    <div
      className='loader-overlay'
    >      
      <div className="flex space-x-4">
        {icons.map(({ Icon, animation, color }, index) => (
          <Icon 
            key={index} 
            className={`h-4 w-4 animate-bounce ${color} ${animation}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default TransparentLoader;
