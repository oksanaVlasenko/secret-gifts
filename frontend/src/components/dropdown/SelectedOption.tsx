import { useDropdownContext } from '@/context/dropdownContext';

import SearchInput from '@/components/dropdown/SearchInput'

import { 
  ChevronDownIcon, 
  XMarkIcon, 
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid';

interface SelectedOptionProps {
  selected: string | number | null,
  isOpen: boolean,
  onSearchQuery: (newSearchValue: string | null) => void;
  onToggle: () => void;
  onClear: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const SelectedOption: React.FC<SelectedOptionProps> = ({
  selected,
  isOpen,
  onSearchQuery,
  onToggle,
  onClear
}) => {

  const { label, disabled, errorText } = useDropdownContext()

  return (
    <>
      <span className='dropdown-label'>
        {label}  
      </span> 

      <div 
        className={`
          dropdown-selected 
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${errorText ? 'has-error' : ''}
        `}
        onClick={() => onToggle()}
      >
        {selected ? (
          <p 
            className={`dropdown-selected-value truncate ${disabled ? 'disabled' : ''}`}
            title={String(selected)}
          >
            {selected}
          </p>
        ) : (
          <SearchInput 
            onSearch={(newSearchValue: string | null) => onSearchQuery(newSearchValue ?? '')}
          />
        )}

        {selected && 
          <XMarkIcon 
            aria-hidden="true" 
            className={`dropdown-icon shrink-0 absolute right-12 text-rose-600 ${disabled ? 'disabled' : ''}`} 
            onClick={(e) => onClear(e)}
          />
        }

        {
          !selected && 
          <MagnifyingGlassIcon aria-hidden="true" 
            className={`h-4 w-4 text-gray-900 shrink-0 absolute right-12 ${disabled ? 'text-slate-400' : ''}`}
          />
        }

        <ChevronDownIcon 
          aria-hidden="true" 
          className={`dropdown-icon shrink-0 absolute right-4 text-gray-900 ${disabled ? 'disabled' : ''} ${isOpen ? 'opened' : ''}`}
        />
      </div>

      {
        errorText && 
        <small className='hint absolute left-0 top-full mt-1 z-0 text-red-500'>{errorText}</small>
      }
    </>
  )
}

export default SelectedOption