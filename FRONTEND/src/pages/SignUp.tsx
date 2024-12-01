
import { useI18n } from '@/i18n-context'

import Input from '@/components/input/Input'

import '@/styles/pages/signup.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const SighUp = () => {
  const { t } = useI18n()

  const [email, setEmail] = useState<string | number | null | undefined>('')
  const [emailErrors, setEmailError] = useState<boolean>(false)
  const [name, setName] = useState<string | number | null | undefined>('')
  const [password, setPassword] = useState<string | number | null | undefined>('')

  const isFilled = !!email && !emailErrors && !!password && !!name

  const handlerEmailChanged = (value: string | number | null | undefined) => {
    setEmail(value)
  }

  const handlerNameChanged = (value: string | number | null | undefined) => {
    setName(value)
  }

  const handleEmailErrors = (existEmailError: boolean | null) => {
    setEmailError(Boolean(existEmailError))
  }

  const handlerPasswordChanged = (value: string | number | null | undefined) => {
    setPassword(value)
  }

  return (
    <div className='signup'>
      <h2 className='text-lg'>{t("signup.title")}</h2>

      <Input 
        value={name}
        label={`${t('signup.name')}`}
        placeholder={`${t('signup.namePlaceholder')}`}
        type='text'
        onChange={handlerNameChanged}
      />

      <Input 
        value={email}
        label={`${t('login.email')}`}
        placeholder={`${t('login.emailPlaceholder')}`}
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

      <button 
        type="button" 
        className={`btn-filled-red sign-up-btn ${!isFilled ? 'disabled' : ''}`}
      >
        {t('signup.signUp')}
      </button>

      <div className="line"></div>

      <p className='text-paragragh'>
        {t('signup.haveAccount')} 
        
        <Link to="/login" className='text-link ml-2'>
          {t('signup.login')}
        </Link>
      </p>
    </div>
  )
}

export default SighUp