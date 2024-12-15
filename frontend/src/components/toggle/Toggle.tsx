import './toggle.scss'

interface ToggleProps {
  sizeClass?: string | null,
  isDisabled?: boolean,
  labelText?: string | null,
  checked: boolean,
  onChange: (value: boolean) => void
}

const Toggle: React.FC<ToggleProps> = ({
  sizeClass = 'small',
  isDisabled = false,
  labelText = 'Toggle state',
  checked = false,
  onChange
}) => {

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    onChange?.(newValue); // Pass updated state to parent
  };

  return (
    <label 
      className={`
        checkbox-label 
        ${sizeClass} 
        ${isDisabled ? 'checkbox-disabled' : ''
      }`}
    >
      <input 
        type="checkbox" 
        className="checkbox-input peer" 
        disabled={isDisabled} 
        checked={checked}
        onChange={onCheckboxChange}
      />

      <div className={`checkbox-track peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-[#3A412C] ${isDisabled ? 'checkbox-disabled' : ''}`}></div>

      <span className="checkbox-label-text">
        {labelText}
      </span>
    </label>
  )
}

export default Toggle