import './textarea.scss'

import { useId } from 'react'

interface TextareaProps {
  value: string | number | null | undefined,
  label?: string | number,
  disabled?: boolean,
  placeholder?: string | number,
  errorText?: string | null | undefined | number,
  onChange: (value: string | number | null | undefined) => void,
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  label,
  disabled,
  placeholder,
  errorText,
  onChange
}) => {
  const textareaId = useId()

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    
    onChange(newValue); 
  };

  return (
    <div className="textarea-wrapper">
      {
        label &&
          <label htmlFor={textareaId} className="label">
            {label}
          </label>
      }
      
      <textarea 
        value={value ?? ''}
        id={textareaId}
        className='input-container'
        autoCorrect='on'
        rows={4}
        disabled={disabled}
        placeholder={String(placeholder)}
        onChange={handleChange}
      />

      {
        (errorText) && 
          <small className='mt-1 text-red-500'>{errorText}</small>
      }
    </div>
  )
}

export default Textarea