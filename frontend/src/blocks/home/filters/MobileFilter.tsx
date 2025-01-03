
import { useState } from 'react';
import { useFilterContext } from "@/context/filtersContext"
import { useI18n } from '@/i18n-context'
import { useOutsideClick } from '@/utils/useOutsideHook';

import DropdownFilter from "@/blocks/home/dropdownFilter/DropdownFilter"
import { FunnelIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import PriceFilter from './PriceFilter';
import Input from '@/components/input/Input';

const MobileFilters: React.FC = () => {
  const { t } = useI18n()

  const { filters, categoriesList, onMobileSelect, onResetFilters } = useFilterContext()

  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalsFilters] = useState(filters)

  const [openBlock, setOpenBlock] = useState<number | null>(null); 

  const toggleBlock = (id: number) => {
    setOpenBlock((prevOpenBlock) => (prevOpenBlock === id ? null : id));
  };

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

  const handleLocalFiltersUpdate = (field: string, values: string[] | string | number | null | undefined) => {
    setLocalsFilters((prev) => ({
      ...prev,
      [field]: values,
    }));
  }

  const applyFilters = () => {
    onMobileSelect(localFilters)
    setIsOpen(false); 
  }

  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      minPrice: 0,
      maxPrice: 0,
      searchText: ''
    };

    setLocalsFilters(resetFilters)

    onResetFilters()

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
            {t('product.filters')}
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
                <h2 className="text-lg font-semibold">
                  {t('product.filters')}
                </h2>
                
                <XMarkIcon 
                  className='toggle-icon'
                  onClick={closeMobileFilters} 
                />
              </div>

              <Input 
                value={localFilters.searchText}
                type='search'
                placeholder={t('system.searchPlaceholder')}
                onChange={(e) => {
                  handleLocalFiltersUpdate('searchText', e)
                }}
              />
                
              <DropdownFilter 
                id={1}
                isOpen={openBlock === 1}
                toggleBlock={toggleBlock}
                options={[{id: 'null', label: t('product.withoutCategory')}, ...categoriesList]}
                label={t('product.categories')}
                selectedIds={localFilters.categories}
                onSelectionChange={(e) => handleLocalFiltersUpdate('categories', e)}
              />

              <PriceFilter 
                id={2}
                isOpen={openBlock === 2}
                toggleBlock={toggleBlock}
                label={t('product.price')}
                minPrice={filters.minPrice}
                maxPrice={filters.maxPrice}
                onPriceChange={handleLocalFiltersUpdate}
              />
            </div>
            
            <div className='mobile-filter-btn-container'>
              <button 
                type="button" 
                className={`btn-outline-red mobile-filter-btn mb-4 xs:mr-4 xs:mb-0`}
                onClick={handleResetFilters}
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
