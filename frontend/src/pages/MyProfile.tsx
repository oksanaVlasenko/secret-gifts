import Input from '@/components/input/Input'
import '@/styles/pages/myProfile.scss'

import { CameraIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n-context'
import InputPhone from '@/components/phone-input/InputPhone'
import InputDate from '@/components/date-input/InputDate'
import Loader from '@/components/loader/Loader'
import axios from 'axios'
import { getToken } from '@/utils/authToken'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type User = {
  email: string | number | null | undefined;
  name: string | number | null | undefined;
  phone: string;
  birthday: Value;
}

const MyProfile: React.FC = () => {
  const { t } = useI18n()
  const token = getToken()

  const [email, setEmail] = useState<string | number | null | undefined>('')
  const [emailErrors, setEmailError] = useState<boolean>(false)
  const [name, setName] = useState<string | number | null | undefined>('')
  const [phone, setPhone] = useState<string>('')
  const [errorPhone, setErrorPhone] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [birthday, setBirthday] = useState<Value>(null)
  const [existUserByEmail, setExistUserByEmail] = useState<string | number | null | undefined>('')
  const [updateing, setUpdateing] = useState<boolean>(false)
  //const [password, setPassword] = useState<string | number | null | undefined>('')
  
  useEffect(() => {
    const fetchUserData = async () => {
      await axios.get('http://localhost:3000/user/', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
        .then((res) => {
          const user = res.data.user

          setName(user?.name ?? '')
          setEmail(user?.email ?? '')
          setPhone(user?.phone ?? '')
          setBirthday(user?.birthday ?? null)
        })
        .catch((err) => {
          console.log(err, ' error')
        })
        .finally(() => setLoading(false))
      
    }

    fetchUserData()
  }, [])

  const disabledSave = existUserByEmail

  const handlerEmailChanged = (value: string | number | null | undefined) => {
    setEmail(value)
    setExistUserByEmail('')
  }

  const handlerNameChanged = (value: string | number | null | undefined) => {
    setName(value)
  }

  const handleEmailErrors = (existEmailError: boolean | null) => {
    setEmailError(Boolean(existEmailError))

    console.log(emailErrors)
  }

  const handlePhoneChanged = (value: string, valid: boolean) => {
    setPhone(value)
    setErrorPhone(valid)

    console.log(errorPhone, ' errorPhone')
  }

  const handleBirthdayChanged = (value: Value, errors: boolean) => {
    setBirthday(value)
    console.log(errors, ' date errors')
  }

  const updateUser = async () => {
    setUpdateing(true)

    const userData: User = {
      name: name,
      email: email,
      phone: phone,
      birthday: birthday
    }

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
        console.log(err, ' error')

        if (err.status === 409) {
          setExistUserByEmail(t('signup.existUser'))
        }
      })
      .finally(() => setUpdateing(false))
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='my-profile'>
      <div className='bg-image'>
        <img  
          src="https://thumbs.wbm.im/pw/medium/bceb48d4e8daf417bcac190269eb2a15.jpg" 
          alt="bg image" 
        />

        <div className='upload-bg'>
          <CameraIcon className='icon-bg-upload'/>
        </div>
      </div>

      <div className="flex items-center justify-between p-6 flex-col sm:flex-row">
        <div className="general-info">
          <img
            className="profile-img"
            src="https://media.istockphoto.com/id/1170911876/photo/selfie-time.jpg?s=612x612&w=0&k=20&c=K-031BAtYvLPitXe5qJvP866e6VtXczTobR4-aXrWgM="
            alt="Profile"
          />

          <div>
            <h3 className="text-xl font-semibold text-[#3A412C]">Profile</h3>
            <p className="text-sm text-[#6B8063]">Update your photo and personal details</p>
          </div>
        </div>

        <button 
          className={`btn-outline-red mt-4 sm:mt-0 ${updateing ? 'pending-animation' : ''} ${disabledSave ? 'disabled' : ''}`}
          onClick={updateUser}
        >
          Save
        </button>
      </div>
      
      <div className="form-block p-6 sm:pl-48 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="item">
            <Input 
              value={name}
              label={`${t('signup.name')}`}
              placeholder={`${t('signup.namePlaceholder')}`}
              type='text'
              onChange={handlerNameChanged}
            />
          </div>
      
          <div className="item">
            <Input 
              value={email}
              label={`${t('login.email')}`}
              placeholder={`${t('login.emailPlaceholder')}`}
              errorText={existUserByEmail}
              type='email'
              onChange={handlerEmailChanged}
              onEmailValid={handleEmailErrors}
            />
          </div>

          <div className="item">
            <InputPhone 
              value={phone}
              label={t('signup.phone')}
              onPhoneChange={handlePhoneChanged}
            />
          </div>

          <div className="item">
            <label className='label'>Change photo</label>

            <div className='flex items-center justify-between'>
              <div className='upload-avatar-bg'>
                <CameraIcon className='icon-avatar-upload'/>
              </div>

              <p className='btn-text'>Delete</p>
              <p className='btn-text'>Update</p>
            </div>
          </div>

          <div className="item">
            <InputDate 
              value={birthday}
              label='Birthday date'
              onChange={handleBirthdayChanged}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile