import { ChevronDownIcon } from '@heroicons/react/16/solid'
import './dropdownFilter.scss'
import Checkbox from '@/components/checkbox/Checkbox'
import { useState } from 'react'
import { useI18n } from '@/i18n-context'

import { Option } from '@/components/dropdown/Dropdown.types';

interface OptionWithChecked extends Option {
  checked: boolean;
}

interface DropdownFilterProps {
  options: Option[],
  selectedIds?: string[],
  label: string,
  onSelectionChange?: (ids: string[]) => void
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  selectedIds,
  label,
  onSelectionChange
}) => {
  const { t } = useI18n()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectAll, setSelectAll] = useState<boolean>(options.length === selectedIds?.length ? true : false)

  const [updatedItems, setUpdatedItems] = useState(
    options.map((item) => ({
      ...item,
      checked: selectedIds?.includes(String(item.id)) ?? false,
    }))
  );

  const handleSelectedIds = (newItems: OptionWithChecked[]) => {
    const newSelectedIds = newItems
      .filter((item) => item.checked)
      .map((item) => String(item.id));

    onSelectionChange?.(newSelectedIds);
  }

  const handleCheckboxChange = (value: boolean, id: string | number) => {
    const newItems = updatedItems.map((item) =>
      item.id === id ? { ...item, checked: value } : item
    );

    setUpdatedItems(newItems);

    setSelectAll(newItems.every(i => i.checked))

    handleSelectedIds(newItems)
  };

  const handleSelectAll = (value: boolean) => {
    setSelectAll(value)

    if (value) {
      const newItems = updatedItems.map((item) => {
        return { ...item, checked: true }
      });

      setUpdatedItems(newItems);

      handleSelectedIds(newItems)
    } else {
      const newItems = updatedItems.map((item) => {
        return { ...item, checked: false }
      });
      
      setUpdatedItems(newItems);

      handleSelectedIds(newItems)
    }
  }

  return (
    <div className='categories-filters'>
      <div 
        className='header'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>

        <ChevronDownIcon 
          aria-hidden="true" 
          className={`toggle-icon ${isOpen ? 'opened' : ''}`}
        />
      </div>

      {
        isOpen && 
        <div className='options-list'>
          <Checkbox 
            value={selectAll}
            label={t('product.selectAll')}
            className='selectAll'
            onCheck={(value) => handleSelectAll(value)} 
          />

          {updatedItems.map((item) => {
            return (
              <Checkbox 
                key={item.id}
                value={item.checked}
                label={item.label}
                onCheck={(value) => handleCheckboxChange(value, item.id)} 
              />
            );
          })}
        </div>
      }
    </div>
  )
}

export default DropdownFilter