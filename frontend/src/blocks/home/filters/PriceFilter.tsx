import { ChevronDownIcon } from "@heroicons/react/16/solid"
import { useCallback, useEffect, useState } from "react"
import { useI18n } from '@/i18n-context'
import Input from "@/components/input/Input"
import { debounce } from 'throttle-debounce'

import './priceFilter.scss'

interface PriceFilterProps {
  id: number,
  isOpen: boolean,
  label: string,
  minPrice: string | number | null | undefined,
  maxPrice: string | number | null | undefined,
  onPriceChange: (field: string, values: string | number | null | undefined) => void,
  toggleBlock?: (id: number) => void
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  id,
  isOpen,
  label,
  minPrice,
  maxPrice,
  onPriceChange,
  toggleBlock
}) => {
  const { t } = useI18n()

  const [localMinPrice, setLocalMinPrice] = useState<string | number | null | undefined>(minPrice)
  const [localMaxPrice, setLocalMaxPrice] = useState<string | number | null | undefined>(maxPrice)

  const toPriceError = localMinPrice && localMaxPrice && Number(localMinPrice) > Number(localMaxPrice)

  const updateInput = useCallback(
    debounce(1000, (field: string, values: string | number | null | undefined) => {
      onPriceChange(field, values)
    }),
    [onPriceChange]
  );

  useEffect(() => {
    setLocalMinPrice(minPrice)
    setLocalMaxPrice(maxPrice)
  }, [minPrice, maxPrice])

  return (
    <div className="price-filter">
      <div 
        className='header'
        onClick={() => toggleBlock?.(id)}
      >
        <span>
          {label}
        </span>

        <ChevronDownIcon 
          aria-hidden="true" 
          className={`toggle-icon ${isOpen ? 'opened' : ''}`}
        />
      </div>

      {
        isOpen && 
        <div className="input-block">
          <Input 
            value={Number(localMinPrice)}
            type='number'
            label={t('product.from')}
            placeholder={t('product.pricePlaceholder')}
            onChange={(e) => {
              setLocalMinPrice(e)
              updateInput('minPrice', e)
            }}
          />

          <Input 
            value={Number(localMaxPrice)}
            type='number'
            label={t('product.to')}
            placeholder={t('product.pricePlaceholder')}
            errorText={toPriceError ? `${t('product.priceError')}` : ''}
            onChange={(e) => {
              setLocalMaxPrice(e)
              updateInput('maxPrice', e)
            }}
          />
        </div>
      }
    </div>
  )
}

export default PriceFilter