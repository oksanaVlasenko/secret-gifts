
import './input.scss'

import { useI18n } from '@/i18n-context'

import { useState } from 'react'
import { debounce } from 'throttle-debounce'

import { useId } from 'react'

import { EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid'

interface InputProps {
  value: string | number | null | undefined,
  label?: string | null | undefined | number,
  errorText?: string | null | undefined | number,
  type?: string | null,
  disabled?: boolean | null,
  placeholder?: string | null,
  maxLength?: number | null,
  minLength?: number | null,
  min?: number | null,
  max?: number | null,
  accept?: string | null,
  onChange: (value: string | number | null | undefined) => void,
  onEmailValid?: (existEmailError: boolean | null) => void
}

const Input: React.FC<InputProps> = ({
  value,
  label = 'Label Text',
  errorText,
  type,
  disabled,
  placeholder,
  maxLength,
  minLength,
  min,
  max,
  accept,
  onChange,
  onEmailValid
}) => {
  const { t } = useI18n()

  const ageInputId = useId()

  const [currentType, setCurrentType] = useState<string | null>(type ?? 'text')
  const [emailError, setEmailError] = useState<string | null>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    onChange(newValue); 

    if (type === 'email') validateEmailInput()
  };

  const togglePassword = () => {
    setCurrentType(currentType === 'password' ? 'text' : 'password')
  }

  const validateEmailInput = debounce(300, () => {
    if (type === 'email' && value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(value))) {
      setEmailError(t('system.invalidEmail'));
    } else {
      setEmailError('');
    }

    onEmailValid?.(!!emailError)
  })

  return (
    <div className={`
      input-wrapper
      ${errorText || emailError ? 'error' : ''}
    `}>
      {
        label && 
        <label 
          htmlFor={ageInputId}
          className='label'
        >
          {label}
        </label>
      }
      
      <input 
        type={String(currentType)}
        id={ageInputId}
        className='input-container'
        value={value ?? ''}
        disabled={Boolean(disabled)}
        placeholder={String(placeholder)}
        maxLength={maxLength ?? 10000}
        minLength={minLength ?? 0}
        max={max ?? 100000}
        min={min ?? 0}
        accept={accept ?? ''}
        onChange={handleChange}
        onBlur={validateEmailInput}
      />

      {
        type === 'password' && currentType === 'password' &&
          <EyeSlashIcon 
            className='icon' 
            onClick={togglePassword}
          />
      }

      {
        type === 'password' && currentType !== 'password' &&
          <EyeIcon 
            className='icon' 
            onClick={togglePassword}
          />
      }

      {disabled}

      {
        (errorText || emailError) && 
        <small className='mt-1 text-red-500'>{errorText || emailError}</small>
      }
    </div>
  )
}

export default Input