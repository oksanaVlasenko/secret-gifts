import { useDropdownContext } from '@/context/dropdownContext';

import { Option } from '@/components/dropdown/Dropdown.types';

import { 
  CheckIcon, 
  FaceFrownIcon
} from '@heroicons/react/20/solid';

function highlightMatch(value: string, search: string | null) {
  if (!search) return value;

  const searchIndex = String(value).toUpperCase().indexOf(String(search).toUpperCase());

  if (searchIndex >= 0) {
    const start = value.substring(0, searchIndex);
    const match = value.substring(searchIndex, searchIndex + search.length);
    const end = value.substring(searchIndex + search.length);

    return `${start}<b>${match}</b>${end}`;
  }

  return value;
}

interface OptionListProps {
  position: string,
  filteredOptions: Option[],
  searchQuery: string | null,
  onSelect: (item: Option) => void
}

const OptionList: React.FC<OptionListProps> = ({
  position,
  filteredOptions,
  searchQuery,
  onSelect
}) => {

  const { selectedValue, notFoundText } = useDropdownContext()
  
  return (
    <div
      className={`dropdown-list custom-scrollbar ${position}`}
    >
      {filteredOptions.length > 0 ? (
        filteredOptions.map((item) => {
          const highlightedLabel = highlightMatch(String(item.label), searchQuery)

          return (
            <p 
              key={item.id}
              className={`dropdown-option ${item.disabled ? 'disabled text-slate-400' : 'text-gray-700'}`}
              onClick={() => onSelect(item)}
            >
              {
                item.icon && 
                <span 
                  className={`option-icon-wrapper  ${item.disabled ? 'disabled' : ''}`} 
                  dangerouslySetInnerHTML={{ __html: item.icon }} 
                />
              }
              
              <span 
                className='truncate' 
                style={{ width: "calc(100% - 1.5rem)" }}
                title={String(item.label)}
                dangerouslySetInnerHTML={{ __html: highlightedLabel }}
              /> 

              {item.id === selectedValue && 
                <CheckIcon 
                  className="w-4 h-4 text-green-600 shrink-0" 
                  style={{ marginRight: '-0.5rem' }}
                />
              }
            </p>
          )
        })
        ) : (
          <div className='dropdown-empty-search'>
            <FaceFrownIcon className='not-found-icon'/>

            <p className='not-found-text'>
              {notFoundText} 
            </p>
          </div>
        )
      }
    </div>
  )
}

export default OptionList