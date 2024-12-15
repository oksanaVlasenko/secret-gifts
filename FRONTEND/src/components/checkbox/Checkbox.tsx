import './checkbox.scss'

import { useId } from 'react'

interface CheckboxProps {
  value: boolean,
  label: string | number,
  className?: string,
  onCheck: (value: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  label,
  className,
  onCheck
}) => {
  const checkboxId = useId()

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(e.target.checked)
  }

  return (
    <div className={`checkbox-container ${className}`}>
      <input 
        id={checkboxId} 
        type="checkbox" 
        checked={value}    
        onChange={handleCheck}    
      />
      
      <label 
        htmlFor={checkboxId} 
      >
        {label}
        {/* {` (${count ?? 0})`} */}
      </label>
    </div>
  )
}

export default Checkbox