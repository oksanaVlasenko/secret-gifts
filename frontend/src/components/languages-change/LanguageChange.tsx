import { 
  LanguageIcon, 
  ChevronDownIcon
} from "@heroicons/react/20/solid"
import './languageChange.scss'

import { useI18n } from '@/i18n-context'
import { useState } from "react"
import { useOutsideClick } from '@/utils/useOutsideHook';


const LanguageChange: React.FC = () => {
  const { i18n } = useI18n()
 
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(i18n.resolvedLanguage, ' ise')
  };

  const ref = useOutsideClick(() => {
    setIsOpen(false)
  });

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng)

    setIsOpen(false)
  };

  return (
    <div ref={ref} className="language-change">
      <div 
        className="icon-container"
        onClick={toggleDropdown}
      >
        <LanguageIcon className="user-icon"/>
        <ChevronDownIcon className="chevron-icon" />
      </div>
      
      {isOpen &&
        <ul className="account-options divide-y">
          <li 
            className="option"
            onClick={() => handleLanguageChange('uk')}
          >
            Українська
          </li>

          <li 
            className="option"
            onClick={() => handleLanguageChange('en')}
          >
            English
          </li>
        </ul>
      }
    </div>
  )
}

export default LanguageChange