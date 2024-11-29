import { useState } from 'react'

import Input from '@/components/input/Input'
import '@/styles/components/login.scss'
import CheckboxSwitch from '@/components/checkbox/Checkbox'

const Login: React.FC = () => {
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
    console.log(existEmailError, ' email error')
    setEmailError(Boolean(existEmailError))
  }

  const handlerRememberMe = (value: boolean) => {
    setRememberMe(value)
  }

  return (
    <div className='login'>
      <h2 className='text-lg'>Nice to see you again</h2>

      <Input 
        value={email}
        label='E-mail'
        placeholder='Enter an email'
        type='email'
        onChange={handlerEmailChanged}
        onEmailValid={handleEmailErrors}
      />

      <Input 
        value={password}
        label='Password'
        placeholder='Enter a password'
        type='password'
        onChange={handlerPasswordChanged}
      />

      <div className='remind-block'>
        <CheckboxSwitch 
          checked={rememberMe}
          labelText='Remember me'
          onChange={handlerRememberMe}
        />

        <p className='text-link'>Forgot password?</p>
      </div>

      <button 
        type="button" 
        className={`btn-filled-red sign-in-btn ${!isFilled ? 'disabled' : ''}`}
      >
        Sign in
      </button>

      <div className="line"></div>

      <p className='text-paragragh'>
        Don't have an account?  
        <span className='text-link ml-2'>Sign up</span>
      </p>
    </div> 
  )
}

export default Login