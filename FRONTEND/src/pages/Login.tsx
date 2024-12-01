import { useState } from 'react'
import { useI18n } from '@/i18n-context'
import { Link } from 'react-router-dom'

import Input from '@/components/input/Input'
import CheckboxSwitch from '@/components/checkbox/Checkbox'

import '@/styles/pages/login.scss'

const Login: React.FC = () => {
  const { t } = useI18n()

  const [email, setEmail] = useState<string | number | null | undefined>('')
  const [emailErrors, setEmailError] = useState<boolean>(false)
  const [password, setPassword] = useState<string | number | null | undefined>('')
  const [rememberMe, setRememberMe] = useState<boolean>(true)

  const isFilled = !!email && !!password && !emailErrors
  
  const handlerEmailChanged = (value: string | number | null | undefined) => {
    setEmail(value)
  }

  const handlerPasswordChanged = (value: string | number | null | undefined) => {
    setPassword(value)
  }

  const handleEmailErrors = (existEmailError: boolean | null) => {
    setEmailError(Boolean(existEmailError))
  }

  const handlerRememberMe = (value: boolean) => {
    setRememberMe(value)
  }

  return (
    <div className='login'>
      <h2 className='text-lg'>{t("login.title")}</h2>

      <Input 
        value={email}
        label={t('login.email')}
        placeholder={t('login.emailPlaceholder')}
        type='email'
        onChange={handlerEmailChanged}
        onEmailValid={handleEmailErrors}
      />

      <Input 
        value={password}
        label={t('login.password')}
        placeholder={t('login.passwordPlaceholder')}
        type='password'
        onChange={handlerPasswordChanged}
      />

      <div className='remind-block'>
        <CheckboxSwitch 
          checked={rememberMe}
          labelText={t('login.rememberMe')}
          onChange={handlerRememberMe}
        />

        <p className='text-link'>
          {t('login.forgotPassword')}
        </p>
      </div>

      <button 
        type="button" 
        className={`btn-filled-red sign-in-btn ${!isFilled ? 'disabled' : ''}`}
      >
        {t('login.signIn')}
      </button>

      <div className="line"></div>

      <p className='text-paragragh'>
        {t('login.noAccount')} 
        
        <Link to="/signup" className='text-link ml-2'>
          {t('login.signUp')}
        </Link>
      </p>
    </div> 
  )
}

export default Login