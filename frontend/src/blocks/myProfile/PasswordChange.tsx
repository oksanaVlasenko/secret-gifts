import Input from '@/components/input/Input'
import { useI18n } from '@/i18n-context'
import axios from 'axios'
import { useState } from 'react'

const PasswordChange: React.FC<{token: string | null, email: string | number | null | undefined}> = ({token, email}) => {
  const { t } = useI18n()

  const [oldPassword, setOldPassword] = useState<string | number | null | undefined>('')
  const [newPassword, setNewPassword] = useState<string | number | null | undefined>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string | number | null | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [oldPasswordError, setOldPasswordError] = useState<string | number | null | undefined>('')

  const notEquil = newPassword && confirmedPassword && String(newPassword) !== String(confirmedPassword)

  const oldAndNewEquil = oldPassword && newPassword && String(oldPassword).toLowerCase() === String(newPassword).toLowerCase()

  const disabledChange = notEquil || !oldPassword || !newPassword || !confirmedPassword || oldAndNewEquil || oldPasswordError
  
  const updatePassword = async () => {
    setLoading(true)

    const data = {
      password: oldPassword,
      newPassword: newPassword,
      email: email
    }

    await axios({
      method: 'patch',
      url: 'http://localhost:3000/user/password',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then(() => {
        setOldPassword('')
        setNewPassword('')
        setConfirmedPassword('')
      })
      .catch((error) => {
        console.error('Error:', error.response?.data || error.message)

        if (error.response?.status === 401) {
          setOldPasswordError(t('myProfile.passwordNotValid'))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  };

  return (
    <>
      <div className="profile-header sm:ml-52">
        <div className="general-info">
          <div>
            <h3 className="text-xl font-semibold text-[#3A412C]">
              {t('myProfile.password')}
            </h3>
            <p className="text-sm text-[#6B8063]">
              {t('myProfile.updatePassword')}
            </p>
          </div>
        </div>

        <button 
          className={`btn-outline-red ml-0 mt-4 sm:mt-0 ${loading ? 'pending-animation' : ''} ${disabledChange ? 'disabled' : ''}`} 
          onClick={updatePassword}
        >
          {t('myProfile.change')}
        </button>
      </div>

      <div className="form-block">
        <div className='grid-template-three'>
          {/* w-full lg:w-72 */}
          <div className="mb-4 sm:w-1/2 pr-2 md:pr-5 lg:pr-10">
            <Input 
              value={oldPassword}
              label={t('myProfile.currentPassword')}
              placeholder={t('login.passwordPlaceholder')}
              type='password'
              errorText={oldPasswordError}
              onChange={(v) => {
                setOldPassword(v)
                setOldPasswordError('')
              }}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10 lg:gap-20'>
            <div className="mb-4">
              <Input 
                value={newPassword}
                label={t('myProfile.newPassword')}
                placeholder={t('login.passwordPlaceholder')}
                type='password'
                errorText={
                  notEquil 
                    ? `${t('myProfile.passwordsDoNotMatch')}` 
                    : oldAndNewEquil 
                    ? `${t('myProfile.passwordSameAsOld')}` 
                    : ''
                }
                onChange={setNewPassword}
              />
            </div>

            {/* w-full lg:w-72 */}
            <div className="mb-4 ">
              <Input 
                value={confirmedPassword}
                label={t('myProfile.confirmNewPassword')}
                placeholder={t('login.passwordPlaceholder')}
                type='password'
                disabled={Boolean(oldAndNewEquil)}
                errorText={notEquil ? `${t('myProfile.passwordsDoNotMatch')}` : ''}
                onChange={setConfirmedPassword}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PasswordChange