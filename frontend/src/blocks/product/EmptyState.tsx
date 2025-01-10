import emptySearchIcon from '@/assets/emptySearch.svg'

import { useI18n } from '@/i18n-context'

interface EmptyStateProps {
  isFilterUse: boolean,
  onResetFilter: () => void,
  onCreateNewWish: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
  isFilterUse,
  onResetFilter,
  onCreateNewWish
}) => {
  const { t } = useI18n()

  return (
    <div className="empty-card">
      <img src={emptySearchIcon} alt="Empty Search" />

      <h2 className="text-center text-[#3A412C] text-lg font-semibold leading-7 pb-1">
        { t('emptyState.message') }
      </h2>

      <p className="text-center text-[#3A412C] text-base font-normal leading-relaxed pb-4">
      { t('emptyState.suggestion') }
      </p>

      <div className='mobile-filter-btn-container mt-6'>
        {
          isFilterUse && (
            <button 
              type="button" 
              className={`btn-outline-red mobile-filter-btn mb-4 xs:mr-4 xs:mb-0`}
              onClick={onResetFilter}
            >
              {t('product.resetFilters')}
            </button>
          )
        }
        
        <button 
          type="button" 
          className={`btn-filled-red mobile-filter-btn`}
          onClick={onCreateNewWish}
        >
          {t('product.createNewProduct')}
        </button>
      </div>
    </div>
  )
}

export default EmptyState