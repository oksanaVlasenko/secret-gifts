import { useDropdownContext } from '@/context/dropdownContext';

import { Option } from '@/components/dropdown/Dropdown.types';
import NewValueBlock from '@/components/dropdown/NewValueBlock'

import { 
  CheckIcon, 
  FaceFrownIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/20/solid';
import { useState } from 'react';
import TransparentLoader from '@/components/loader/TransparentLoader';


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
  const [loading, setLoading] = useState<boolean>(false);
  //const [edit, setEdit] = useState<boolean>(false)
  const { selectedValue, notFoundText, onDeleteOption } = useDropdownContext()

  const handleDelete = async (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    setLoading(true)

    const result = await onDeleteOption?.(id)

    setLoading(false);

    if (result?.success) {
      console.log('end');
    } else {
      console.log(result?.error);
    }
  }

  return (
    <div
      className={`dropdown-list custom-scrollbar ${position}`}
    >
      { loading && <TransparentLoader />}
      
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
                item.icon && !item.editIcon &&
                <span 
                  className={`option-icon-wrapper  ${item.disabled ? 'disabled' : ''}`} 
                  dangerouslySetInnerHTML={{ __html: item.icon }} 
                />
              }
              
              {
                !item.editIcon ? (
                  <span 
                    className='truncate' 
                    style={{ width: "calc(100% - 1.5rem)" }}
                    title={String(item.label)}
                    dangerouslySetInnerHTML={{ __html: highlightedLabel }}
                  /> 
                ) : (
                  <input />
                )
              }
              

              {item.id === selectedValue && 
                <CheckIcon 
                  className="w-4 h-4 text-green-600 shrink-0" 
                  style={{ marginRight: '-0.5rem' }}
                />
              }

              <PencilIcon 
                className="w-4 h-4 text-[#D49A7A] shrink-0" 
                style={{ marginRight: '-0.5rem', marginLeft: '1rem' }}
              />

              {
                item.deleteIcon && 
                <TrashIcon 
                  className="w-4 h-4 text-[#9B0D0F] shrink-0" 
                  style={{ marginRight: '-0.5rem', marginLeft: '1rem' }}
                  onClick={(e) => handleDelete(e, item.id)}
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

      <NewValueBlock />
    </div>
  )
}

export default OptionList