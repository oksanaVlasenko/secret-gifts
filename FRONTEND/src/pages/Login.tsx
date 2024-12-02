import { useState } from 'react'
import { useI18n } from '@/i18n-context'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setUser } from '@/store/user/userSlice';

import Input from '@/components/input/Input'
import CheckboxSwitch from '@/components/checkbox/Checkbox'

import '@/styles/pages/login.scss'
import axios, { AxiosError }  from 'axios'

import { saveTokenAndId } from '@/utils/authToken'
import { useNavigate } from 'react-router-dom';

type User = {
  email: string | number | null | undefined;
  password: string | number | null | undefined
}

const Login: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState<string | number | null | undefined>('')
  const [emailErrors, setEmailError] = useState<boolean>(false)
  const [password, setPassword] = useState<string | number | null | undefined>('')
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [loginError, setLoginError] = useState<string | number | null | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)

  const isFilled = !!email && !!password && !emailErrors && !loginError
  
  const handlerEmailChanged = (value: string | number | null | undefined) => {
    setEmail(value)
    setLoginError('')
  }

  const handlerPasswordChanged = (value: string | number | null | undefined) => {
    setPassword(value)
    setLoginError('')
  }

  const handleEmailErrors = (existEmailError: boolean | null) => {
    setEmailError(Boolean(existEmailError))
  }

  const handlerRememberMe = (value: boolean) => {
    setRememberMe(value)
  }

  const handerSignIn = async () => {
    setLoading(true)

    const user: User = {
      email: String(email).toLowerCase(),
      password: password
    }

    try {
      const res = await axios.post('http://localhost:3000/auth/login', user);
      console.log(res.data, 'res');
  
      saveTokenAndId(res.data.token, res.data.id, rememberMe);

      dispatch(setUser({ 
        id: res.data.id, 
        name: res.data.name, 
        email: res.data.email, 
        token: res.data.token,
        isAuthenticated: true,
        loading: true
      }));
  
      setLoading(false);
      navigate('/'); 
    } catch (err) {
      console.error('Error:', err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setLoginError(t('login.userNotFound'));
        }
      } 
    }
  }

  return (
    <div className='login'>
      <h2 className='text-lg'>{t("login.title")}</h2>

      <Input 
        value={email}
        label={t('login.email')}
        placeholder={t('login.emailPlaceholder')}
        type='email'
        errorText={loginError}
        onChange={handlerEmailChanged}
        onEmailValid={handleEmailErrors}
      />

      <Input 
        value={password}
        label={t('login.password')}
        placeholder={t('login.passwordPlaceholder')}
        type='password'
        errorText={loginError}
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
        className={`btn-filled-red sign-in-btn ${loading ? 'pending-animation' : ''} ${!isFilled ? 'disabled' : ''}`}
        onClick={handerSignIn}
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