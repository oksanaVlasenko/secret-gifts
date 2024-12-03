import { useRef, useState } from 'react';
import 'react-international-phone/style.css';
import { defaultCountries, parseCountry, PhoneInput } from 'react-international-phone';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { useI18n } from '@/i18n-context'

import './inputPhone.scss'

const countries = defaultCountries.filter((country) => {
  const { iso2 } = parseCountry(country);
  return iso2 !== 'ru';
});

interface InputPhoneProps {
  label?: string,
  value: string,
  onPhoneChange: (value: string) => void,
  onPhoneError: (error: boolean) => void
}


const InputPhone: React.FC<InputPhoneProps> = ({
  label,
  value,
  onPhoneChange,
  onPhoneError
}) => {
  const { t } = useI18n()

  const [phoneError, setPhoneError] = useState<string | null>('')
  const isFirstRender = useRef(true);

  const handlePhoneChange = (value: string) => {
    if (isFirstRender.current) {
      isFirstRender.current = false; 
      return;
    }

    let isValid = false

    if (value.length > 4) { 
      const phoneNumber = parsePhoneNumberFromString(value);
      isValid = phoneNumber?.isValid() ?? false

      setPhoneError(!isValid ? t('system.invalidPhone') : '')
    } else {
      isValid = true
      setPhoneError(''); 
    }

    setPhoneError(!isValid ? t('system.invalidPhone') : '')

    onPhoneChange(value)
    onPhoneError(!isValid)
  };

  return (
    <div className='input-phone-container'>
      <label className='label'>
        {label}
      </label>

      <PhoneInput
        defaultCountry="ua"
        value={value}
        countries={countries}
        onChange={handlePhoneChange}
      /> 

      {phoneError && 
        <small className='mt-1 text-red-500'>
          { phoneError }
        </small>
      }
    </div>
  )
}

export default InputPhone