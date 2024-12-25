import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import DropdownFilter from "@/blocks/home/dropdownFilter/DropdownFilter"
import { useFilterContext } from "@/context/filtersContext"
import { useI18n } from '@/i18n-context'
import { useOutsideClick } from '@/utils/useOutsideHook';
//import { Filter } from '@/blocks/home/filters/Filter.types'

const MobileFilters: React.FC = () => {
  const { t } = useI18n()

  const { filters, categoriesList, onMobileSelect, onResetFilters } = useFilterContext()

  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalsFilters] = useState(filters)

  // const setLocalsFilters = (newFilters?: Filter): Filter => {
  //   if (newFilters) {
  //     return newFilters
  //   }

  //   const result: Filter = filters 

  //   return result
  // }

  // const localFilters = setLocalsFilters()

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileFilters = () => {
    setIsOpen(false);     
    setLocalsFilters(filters) 
  }

  const filtersRef = useOutsideClick(() => {
    closeMobileFilters()   
  });

  const handleLocalFiltersUpdate = (field: string, values: string[]) => {
    setLocalsFilters((prev) => ({
      ...prev,
      [field]: values,
    }));
    // const updatedFilters = {
    //   ...localFilters,
    //   [field]: values, 
    // };

    // console.log(updatedFilters, ' upd')

    // setLocalsFilters(updatedFilters);

    // console.log(localFilters, ' lock')
  }

  const applyFilters = () => {
    onMobileSelect(localFilters)
    setIsOpen(false); 
  }

  return (
    <div className='mobile-filters'>
      <div 
        className='header'
        onClick={toggleFilter}
      >
        <div className='header-text'>
          <FunnelIcon className='toggle-icon' />

          <span>
            Filters
          </span>
        </div>
        

        <ChevronDownIcon 
          aria-hidden="true" 
          className={`toggle-icon ${isOpen ? 'opened' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="filters-container">
          <div className="filters-block" ref={filtersRef}>
            <div>
              <div className='header'>
                <h2 className="text-lg font-semibold">Фільтри</h2>
                
                <XMarkIcon 
                  className='toggle-icon'
                  onClick={closeMobileFilters} 
                />
              </div>
                
              <DropdownFilter 
                options={[{id: 'null', label: t('product.withoutCategory')}, ...categoriesList]}
                label={t('product.categories')}
                selectedIds={localFilters.categories}
                onSelectionChange={(e) => handleLocalFiltersUpdate('categories', e)}
              />
            </div>
            
            <div className='mobile-filter-btn-container'>
              <button 
                type="button" 
                className={`btn-outline-red mobile-filter-btn mb-4 xs:mr-4 xs:mb-0`}
                onClick={onResetFilters}
              >
                {t('product.resetFilters')}
              </button>

              <button 
                type="button" 
                className={`btn-filled-red mobile-filter-btn`}
                onClick={applyFilters}
              >
                {t('product.applyFilters')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilters;
