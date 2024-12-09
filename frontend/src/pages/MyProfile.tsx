import '@/styles/pages/myProfile.scss'

import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n-context'
import { User, UserError, Value, Flags } from '@/types/myProfile.types';
import { getToken } from '@/utils/authToken'

import Loader from '@/components/loader/Loader'
import axios from 'axios'

import CoverImage from '@/blocks/myProfile/CoverImage'
import ProfileHeader from '@/blocks/myProfile/ProfileHeader'
import Form from '@/blocks/myProfile/Form'
import PasswordChange from '@/blocks/myProfile/PasswordChange';
import { handleCatch } from '@/utils/handleCatch';

const MyProfile: React.FC = () => {
  const { t } = useI18n()
  const token = getToken()

  const [userData, setUserData] = useState<User>({
    email: '',
    name: '',
    phone: '',
    birthday: null
  })

  const [userErrors, setUserErrors] = useState<UserError>({
    emailErrors: false,
    errorPhone: false,
    existUserByEmail: ''
  })

  const [flags, setFlags] = useState<Flags>({
    updating: false,
    loading: true
  })

  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [coverUrl, setCoverUrl] = useState<string>('')

  const disabledSave = userErrors.existUserByEmail || userErrors.errorPhone || userErrors.emailErrors

  useEffect(() => {
    fetchUserData()

  }, [])

  const handleInputChange = (field: string, value: string | number | null | undefined | Value) => {  
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputErrors = (field: string, value: boolean | string) => {
    setUserErrors((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFlagChange = (field: string, value: boolean) => {
    setFlags((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      updateAvatar(selectedFile)
    } else {
      console.error("No file selected or e.target.files is null");
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      updateCover(selectedFile)
    } else {
      console.error("No file selected or e.target.files is null");
    }
  }

  const fetchUserData = async () => {
    await axios.get('http://localhost:3000/user/', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => {
        const user = res.data.user

        setUserData({
          name: user?.name ?? '',
          email: user?.email ?? '',
          phone: user?.phone ?? '',
          birthday: user?.birthday ?? null
        })

        setAvatarUrl(user?.avatarURL ?? '')
        setCoverUrl(user?.coverURL ?? '')
      })
      .catch((err) => {
        handleCatch(err)
      })
      .finally(() => handleFlagChange('loading', false))
    
  }

  const updateAvatar = (file: File) => {
    handleFlagChange('updating', true)
    const formData = new FormData();

    if (file) {
      formData.append('avatar', file);
    } else {
      console.error('File is undefined');
      handleFlagChange('updating', false)
      return
    }

    axios({
      method: 'patch',
      url: 'http://localhost:3000/user/avatar',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        setAvatarUrl(response.data.user?.avatarURL ?? '')
      } )
      .catch((error) => console.error('Error:', error.response?.data || error.message))
      .finally(() => handleFlagChange('updating', false))
  };

  const updateCover = (file: File) => {
    handleFlagChange('updating', true)
    const formData = new FormData();

    console.log(file, ' file')
    if (file) {
      formData.append('cover', file);
    } else {
      console.error('File is undefined');
      handleFlagChange('updating', false)
      return
    }

    console.log(formData, ' data form')
    axios({
      method: 'patch',
      url: 'http://localhost:3000/user/cover',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        setCoverUrl(response.data.user?.coverURL ?? '')
        console.log('Success:', response.data)
      } )
      .catch((error) => console.error('Error:', error.response?.data || error.message))
      .finally(() => handleFlagChange('updating', false))
  };

  const deleteAvatar = async () => {
    handleFlagChange('updating', true)

    await axios({
      method: 'delete',
      url: 'http://localhost:3000/user/avatar',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(async (response) => {
        setAvatarUrl('')
        console.log('Success:', response.data)
      } )
      .catch((error) => console.error('Error:', error.response?.data || error.message))
      .finally(() => handleFlagChange('updating', false))
  }

  const handleDeleteCoverImage = async () => {
    handleFlagChange('updating', true)

    await axios({
      method: 'delete',
      url: 'http://localhost:3000/user/cover',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(async () => {
        setCoverUrl('')
      } )
      .catch((error) => console.error('Error:', error.response?.data || error.message))
      .finally(() => handleFlagChange('updating', false))
  }

  const updateUser = async () => {
    handleFlagChange('updating', true)

    await axios.patch('http://localhost:3000/user/', userData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res, ' res')
    })
    .catch((err) => {
      if (err.status === 409) {
        handleInputErrors('existUserByEmail', t('signup.existUser'))
      }
    })
    .finally(() => handleFlagChange('updating', false))
  }

  if (flags.loading) {
    return <Loader />
  }

  return (
    <div className='my-profile'>
      <CoverImage 
        coverURL={coverUrl}
        onCoverFileChange={handleCoverFileChange}
        onDeleteCover={handleDeleteCoverImage}
      />

      <ProfileHeader 
        avatarUrl={avatarUrl}
        name={userData.name}
      >
        <button 
          className={`btn-outline-red ml-0 mt-4 sm:mt-0 ${flags.updating ? 'pending-animation' : ''} ${disabledSave ? 'disabled' : ''}`}
          onClick={updateUser}
        >
          {t('myProfile.save')}
        </button>
      </ProfileHeader>

      <Form 
        userData={userData}
        userErrors={userErrors}
        flags={flags}
        onInputChange={handleInputChange}
        onInputErrors={handleInputErrors}
        onDeleteAvatar={deleteAvatar}
        onFileChange={handleFileChange}
      />

      <PasswordChange token={token} email={userData.email} />
    </div>
  )
}

export default MyProfile