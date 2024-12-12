import { useState } from 'react'

import { useDropdownContext } from '@/context/dropdownContext';
import { useOutsideClick } from '@/utils/useOutsideHook';
import { Option } from '@/components/dropdown/Dropdown.types';

import SelectedOption from '@/components/dropdown/SelectedOption'
import OptionList from '@/components/dropdown/OptionList';

import '@/components/dropdown/Dropdown.scss'

const Dropdown: React.FC = () => { 
  const {
    selectedValue,
    options = [],
    disabled,
    size = 'medium',
    onSelectChange,
    onOpenList,
    onCloseList,
    onClearValue
  } = useDropdownContext()

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [position, setPosition] = useState<string>('down') // "up" | "down"

  const setSelected = (value: string | number | null) => {
    let select: string | number | null = null
    
    if (value) {
      return select = value
    }

    if (!selectedValue) return select

    if (!options || options.length === 0) return select

    const option = options.find((o: Option) => o.id === selectedValue)

    if (option) {
      select = option.label
    }

    return select
  } 

  const selected = setSelected(null)

  const selectItem = (item: Option ) => {
    setSelected(item.label ?? null)
    onSelectChange(item.id ?? null)
    setIsOpen(false)
    setSearchQuery('')
  }

  const clearSelected = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()

    setSelected(null)
    onSelectChange(null)
    setIsOpen(false)
    setSearchQuery('')
    onClearValue?.()
  } 

  const toggleList = () => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove >= 200) {
      setPosition('up')
    } else {
      setPosition('down')
    }

    setIsOpen(!isOpen)

    if (!isOpen) {
      onOpenList?.()
    } else {
      onCloseList?.()
    }
  }

  const filteredOptions = options?.filter((item: Option) =>
    item.label.toString().toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? []

  const dropdownRef = useOutsideClick(() => {
    setIsOpen(false);  
        
    onCloseList?.()
  });

  return (
    <div 
      ref={dropdownRef}
      className={`dropdown-container ${disabled ? 'disabled' : ''} ${size}`}
    >
      <SelectedOption 
        selected={selected}
        isOpen={isOpen}
        onSearchQuery={(newSearchValue: string | null) => setSearchQuery(newSearchValue ?? '')}
        onToggle={toggleList}
        onClear={(e) => clearSelected(e)}
      />
      
      {
        isOpen && 
        <OptionList 
          position={position}
          filteredOptions={filteredOptions}
          searchQuery={searchQuery}
          onSelect={selectItem}
        />
      }
    </div>
  )
}

export default Dropdown