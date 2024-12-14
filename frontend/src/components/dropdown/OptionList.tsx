import { useDropdownContext } from '@/context/dropdownContext';

import { Option } from '@/components/dropdown/Dropdown.types';
import NewValueBlock from '@/components/dropdown/NewValueBlock'

import { 
  CheckIcon, 
  FaceFrownIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/20/solid';
import { useState } from 'react';
import TransparentLoader from '@/components/loader/TransparentLoader';
import Input from '@/components/input/Input';
import { useI18n } from '@/i18n-context'


function highlightMatch(value: string, search: string | null) {
  if (!search) return value;

  const regex = new RegExp(`(${search})`, 'ig');
  const parts = value.split(regex);

  return parts.map((part, i) => 
    regex.test(part) ? <b key={i}>{part}</b> : part
  );
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
  const { t } = useI18n()

  const [loading, setLoading] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<string | number | null>(null);
  const [editValue, setEditValue] = useState<string | number | null | undefined>('');
  const [newValueError, setNewValueError] = useState<string | number | null | undefined>('')

  const { selectedValue, notFoundText, onDeleteOption, onEditOption } = useDropdownContext()

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

  const startEditing = (item: Option) => {
    setEditItemId(item.id);
    setEditValue(String(item.label));
  };

  const handleInput = (value: string | number | null | undefined) => {
    setEditValue(value)
    setNewValueError('')
  }

  const saveEdit = async (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();

    if (!editValue) return; 

    const oldName = filteredOptions.find(o => o.id === id)?.label 

    if (oldName && String(oldName).trim() === String(editValue).trim()) {
      cancelEdit()

      return;
    }
  
    setLoading(true)

    const result = await onEditOption?.(id, editValue);
  
    setLoading(false)

    if (result?.success) {
      cancelEdit()
    } else {
      setNewValueError(result?.error)
    }
  };

  const cancelEdit = () => {
    setEditItemId(null);
    setEditValue('');
    setLoading(false)
    setNewValueError('')
  };

  return (
    <div
      className={`dropdown-list custom-scrollbar ${position}`}
    >
      { loading && <TransparentLoader />}
      
      {filteredOptions.length > 0 ? (
        filteredOptions.map((item) => {
          const isEditing = editItemId === item.id;

          return (
            <div 
              key={item.id}
              className={`dropdown-option
                ${item.disabled ? 'disabled text-slate-400' : 'text-gray-700'}
                ${item.id === selectedValue ? 'selected': ''}
              `}
              onClick={() => !isEditing && onSelect(item)}
            >
              {
                item.icon && !isEditing &&
                <span 
                  className={`option-icon-wrapper  ${item.disabled ? 'disabled' : ''}`} 
                  dangerouslySetInnerHTML={{ __html: item.icon }} 
                />
              }
              
              {
                !isEditing ? (
                  <span 
                    className='truncate' 
                    style={{ width: "calc(100% - 1.5rem)" }}
                    title={String(item.label)}
                  >
                    {highlightMatch(String(item.label), searchQuery)}
                  </span>
                ) : (
                  <Input 
                    value={editValue ?? ''}
                    errorText={newValueError}
                    placeholder={t('system.newValuePlaceholder')}
                    onChange={handleInput}
                  />
                )
              }

              {isEditing ? (
                <>
                  <CheckIcon
                    className={`text-green-600 icon ${!editValue ? 'disabled-icon' : ''}`}
                    onClick={(e) => saveEdit(e, item.id)}
                  />
                  <XMarkIcon
                    className="text-[#9B0D0F] icon"
                    onClick={cancelEdit}
                  />
                </>
              ) : (
                <>
                  <PencilIcon 
                    className="text-[#D49A7A] icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(item);
                    }}
                  />

                  <TrashIcon 
                    className="text-[#9B0D0F] icon" 
                    onClick={(e) => handleDelete(e, item.id)}
                  />
                </>
              )}
            </div>
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