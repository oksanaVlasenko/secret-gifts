import { useState } from 'react'
import './currencySelect.scss'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useOutsideClick } from '@/utils/useOutsideHook';

const options = [
  {
    id: 'uah',
    label: 'UAH ₴'
  },
  {
    id: 'usd',
    label: 'USD $'
  },
  {
    id: 'eur',
    label: 'EUR €'
  },
]

const CurrencySelect: React.FC<{ value?: string, onSelect?: (value: string) => void }> = ({value, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const setSelected = (value: string) => {
    let select: string | number | null = null

    if (!options || options.length === 0) return select

    const option = options.find(o => o.id === value)

    if (option) {
      select = option.label
    }

    return select
  } 

  const selected = setSelected(value ?? '')

  const handleClick = (item: { id: string, label: string }) => {
    setSelected(item.id)
    setIsOpen(false)
    onSelect?.(item.id)
  }

  const ref = useOutsideClick(() => {
    setIsOpen(false)
  });

  return (
    <div ref={ref} className='currency-select'>
      <div className='dropdown-selected' onClick={() => setIsOpen(!isOpen)}>
        {
          selected ? 
          (
            <p className={`dropdown-selected-value truncate`}>{selected}</p>
          ) : (
            <p className={`dropdown-selected-value truncate`}>UAH ₴</p>
          )
        }

        <ChevronDownIcon 
          aria-hidden="true" 
          className={`dropdown-icon ${isOpen ? 'opened' : ''}`}
          
        />
      </div>
      

      {
        isOpen && 
          <div className='dropdown-list'>
            {options.map((item) => (
              <p 
                className='dropdown-option' key={item.id}
                onClick={() => handleClick(item)}
              >
                {item.label}
              </p>
            ))}
          </div>
      }
    </div>
  )
}

export default CurrencySelect