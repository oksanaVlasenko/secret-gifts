import InputDate from "@/components/date-input/InputDate"
import FileInput from "@/components/file-input/FileInput"
import Input from "@/components/input/Input"
import InputPhone from "@/components/phone-input/InputPhone"

import { useI18n } from '@/i18n-context'
import { CameraIcon } from "@heroicons/react/16/solid"

import { User, UserError, Value, Flags } from '@/types/myProfile.types';

interface FormProps {
  userData: User,
  userErrors: UserError,
  flags: Flags,
  onInputChange: (field: string, value: string | number | null | undefined | Value) => void,
  onInputErrors: (field: string, value: boolean | string) => void,
  onDeleteAvatar: () => void,
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Form: React.FC<FormProps> = ({
  userData,
  userErrors,
  flags,
  onInputChange,
  onInputErrors,
  onFileChange,
  onDeleteAvatar
}) => {
  const { t } = useI18n()
  
  return (
    <div className="form-block">
      <div className="grid-template">
        <div className="item">
          <Input 
            value={userData.name}
            label={`${t('signup.name')}`}
            placeholder={`${t('signup.namePlaceholder')}`}
            type='text'
            onChange={(e) => onInputChange('name', e)}
          />
        </div>
    
        <div className="item">
          <Input 
            value={userData.email}
            label={`${t('login.email')}`}
            placeholder={`${t('login.emailPlaceholder')}`}
            errorText={userErrors.existUserByEmail}
            type='email'
            onChange={(e) => onInputChange('email', e)}
            onEmailValid={(e) => onInputErrors('emailErrors', Boolean(e))}
          />
        </div>

        <div className="item">
          <InputPhone 
            value={userData.phone}
            label={t('signup.phone')}
            onPhoneChange={(e) => onInputChange('phone', e)}
            onPhoneError={(e) => onInputErrors('errorPhone', Boolean(e))}
          />
        </div>

        <div className="item">
          <label className='label'>
            {t('myProfile.photoLabel')}
          </label>

          <div className='flex items-center justify-between'>
            <FileInput 
              triggerElement={
                  <div className='upload-avatar-bg'>
                    <CameraIcon className='icon-avatar-upload'/>
                  </div>                   
              }
              onFileSelect={onFileChange}
            />

            <button 
              className={
                `btn-outline-red small mt-2 
                ${flags.updating ? 'pending-animation' : ''}`
              }
              onClick={onDeleteAvatar}
            >
              {t('myProfile.delete')}
            </button>
          </div>
        </div>

        <div className="item">
          <InputDate 
            value={userData.birthday}
            label={t('myProfile.birthdayLabel')}
            onChange={(e) => onInputChange('birthday', e)}
          />
        </div>
      </div>
    </div>
  )
}

export default Form