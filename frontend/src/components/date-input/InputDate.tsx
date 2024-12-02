import './inputDate.scss'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { useId, useState } from 'react'
import DatePicker from 'react-date-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface InputDateProps {
  value: Value | null;
  onChange: (value: Value | null, errors: boolean) => void;
  label?: string
}

const InputDate: React.FC<InputDateProps> = ({
  value,
  onChange,
  label
}) => {
  const ageInputId = useId()

  const [errors, setErrors] = useState<string>('')

  const handleOnChange = (value: Value) => {
    onChange(value, !!errors)
  }

  const handlerInvalidChange = () => {
    console.log('handlerInvalidChange', value)
    setErrors('Invalid date format!')
  }

  const handlerCalendarClose = () => {
    if (errors) {
      setErrors('')
      onChange(null, !!errors)
    }
  }

  return (
    <div className={`input-date ${errors ? 'error' : ''}`}>
      {
        label &&
        <label 
          className='label'
          htmlFor={ageInputId}
        >
          {label}
        </label>
      }
      
      <DatePicker 
        value={value} 
        className={`${errors ? 'error' : ''}`}
        onInvalidChange={handlerInvalidChange}
        onCalendarClose={handlerCalendarClose}
        onChange={handleOnChange} 
      />

      {
        (errors) && 
          <small className='mt-1 text-red-500'>{ errors }</small>
      }
    </div>
  )
}

export default InputDate