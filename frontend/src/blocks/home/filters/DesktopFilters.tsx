import DropdownFilter from "@/blocks/home/dropdownFilter/DropdownFilter"

import { useFilterContext } from "@/context/filtersContext"
import { useI18n } from '@/i18n-context'
import PriceFilter from "./PriceFilter"
import { useCallback, useEffect, useState } from "react"
import Input from "@/components/input/Input"
import { debounce } from "throttle-debounce"

const DesktopFilters: React.FC = () => {
  const { t } = useI18n()

  const { filters, categoriesList, onSelectChange, onResetFilters } = useFilterContext()

  const [openBlock, setOpenBlock] = useState<number | null>(null); 
  const [localSearch, setLocalSearch] = useState<string | number | null | undefined>(filters.searchText)

  const toggleBlock = (id: number) => {
    setOpenBlock((prevOpenBlock) => (prevOpenBlock === id ? null : id));
  };

  const updateInput = useCallback(
    debounce(1000, (field: string, values: string | number | null | undefined) => {
      onSelectChange(field, values)
    }),
    [onSelectChange]
  );

  useEffect(() => {
    setLocalSearch(filters.searchText)
  }, [filters.searchText])

  return (
    <div className='filters'>
      <div>
        <Input 
          value={localSearch}
          type='search'
          placeholder={t('system.searchPlaceholder')}
          onChange={(e) => {
            setLocalSearch(e)
            updateInput('searchText', e)
          }}
        />

        <DropdownFilter 
          id={1}
          isOpen={openBlock === 1}
          toggleBlock={toggleBlock}
          options={[{id: 'null', label: t('product.withoutCategory')}, ...categoriesList]}
          label={t('product.categories')}
          selectedIds={filters.categories}
          onSelectionChange={(e) => onSelectChange('categories', e)}
        />

        <PriceFilter 
          id={2}
          isOpen={openBlock === 2}
          toggleBlock={toggleBlock}
          label={t('product.price')}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onPriceChange={onSelectChange}
        />
      </div>
      
      <button 
        type="button" 
        className={`btn-outline-red reset-btn`}
        onClick={onResetFilters}
      >
        {t('product.resetFilters')}
      </button>
    </div>
  )
}

export default DesktopFilters