import { 
  UserIcon, 
  ChevronDownIcon, 
  ArrowRightStartOnRectangleIcon,
  InformationCircleIcon 
} from "@heroicons/react/20/solid"
import './userAccount.scss'

import { useI18n } from '@/i18n-context'
import { useEffect, useState } from "react"
import { useOutsideClick } from '@/utils/useOutsideHook';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { logout } from '@/store/user/userSlice';
import { useNavigate } from "react-router-dom";
import { clearTokenAndId } from '@/utils/authToken'
import { getToken } from '@/utils/authToken'
import { handleCatch } from '@/utils/handleCatch';

import axios from "axios";

const UserAccount: React.FC = () => {
  const { t } = useI18n()
  const token = getToken()
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchAvatarUrl()

  }, [])
  
  const fetchAvatarUrl = async () => {
    setLoading(true)

    await axios.get('http://localhost:3000/user/', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => {
        setAvatar(res.data.user?.avatarURL ?? null)
      })
      .catch((err) => handleCatch(err))
      .finally(() => setLoading(false))
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
        {
          loading ? (
            <div className="loading-img pending-animation"></div>
          ) : (
            avatar ? (
              <img src={avatar} alt="Avatar" className="avatar-img" />
            ) : (
              <UserIcon className="user-icon"/>
            )
          )
        }
        
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