import Input from '@/components/input/Input'
import { useI18n } from '@/i18n-context'
import { useState } from 'react'

const PasswordChange: React.FC = () => {
  const { t } = useI18n()

  const [oldPassword, setOldPassword] = useState<string | number | null | undefined>('')
  const [newPassword, setNewPassword] = useState<string | number | null | undefined>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string | number | null | undefined>('')

  const notEquil = newPassword && confirmedPassword && String(newPassword) !== String(confirmedPassword)

  const oldAndNewEquil = oldPassword && newPassword && String(oldPassword).toLowerCase() === String(newPassword).toLowerCase()

  const disabledChange = notEquil || !oldPassword || !newPassword || !confirmedPassword || oldAndNewEquil
  
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
          className={`btn-outline-red mt-4 sm:mt-0 ${disabledChange ? 'disabled' : ''}`} 
          // ${flags.updating ? 'pending-animation' : ''} 
        >
          {t('myProfile.change')}
        </button>
      </div>

      <div className="form-block">
        <div className='grid-template-three'>
          <div className="mb-4 sm:w-1/2 w-full lg:w-80 gap-8">
            <Input 
              value={oldPassword}
              label={t('myProfile.currentPassword')}
              placeholder={t('login.passwordPlaceholder')}
              type='password'
              onChange={setOldPassword}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className="mb-4 w-full lg:w-80">
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

            <div className="mb-4 w-full lg:w-80">
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