import { 
  UserIcon, 
  ChevronDownIcon, 
  ArrowRightStartOnRectangleIcon,
  InformationCircleIcon 
} from "@heroicons/react/20/solid"
import './userAccount.scss'

import { useI18n } from '@/i18n-context'
import { useState } from "react"
import { useOutsideClick } from '@/utils/useOutsideHook';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { logout } from '@/store/user/userSlice';
import { useNavigate } from "react-router-dom";
import { clearTokenAndId } from '@/utils/authToken'

const UserAccount: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleMouseEnter = () => {
  //   setIsOpen(true);
  // };

  const ref = useOutsideClick(() => {
    setIsOpen(false)
  });

  const handlerProfile = () => {
    setIsOpen(false)

    navigate('/profile')
  }

  const handlerLogout = () => {
    clearTokenAndId()

    dispatch(logout())

    navigate('/login')
  }

  return (
    <div ref={ref} className="user-account">
      <div 
        className="icon-container"
        onClick={toggleDropdown}
      >
        <UserIcon className="user-icon"/>
        <ChevronDownIcon className="chevron-icon" />
      </div>
      
      {isOpen &&
        <ul className="account-options divide-y">
          <li 
            className="option"
            onClick={handlerProfile}
          >
            <InformationCircleIcon className="list-icon"/>
            { t('userAccount.myProfile') }
          </li>

          <li 
            className="option"
            onClick={handlerLogout}
          >
            <ArrowRightStartOnRectangleIcon className="list-icon" /> 

            { t('userAccount.logOut') }
          </li>
        </ul>
      }
    </div>
  )
}

export default UserAccount