import DropdownFilter from "@/blocks/home/dropdownFilter/DropdownFilter"
import { useFilterContext } from "@/context/filtersContext"
import { useI18n } from '@/i18n-context'


const DesktopFilters: React.FC = () => {
  const { t } = useI18n()

  const { filters, categoriesList, onSelectChange } = useFilterContext()

  return (
    <div className='filters'>
      <DropdownFilter 
        options={[{id: 'null', label: t('product.withoutCategory')}, ...categoriesList]}
        label={t('product.categories')}
        selectedIds={filters.categories}
        onSelectionChange={(e) => onSelectChange('categories', e)}
      />
    </div>
  )
}

export default DesktopFilters