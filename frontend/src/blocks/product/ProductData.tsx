import Input from "@/components/input/Input"
import Textarea from "@/components/textarea/Textarea"
import { useI18n } from '@/i18n-context'

import { Product } from '@/types/product.types'

interface ProductDataProps {
  product: Product,
  onInputChange: (field: string, value: string | number | null | undefined ) => void
}

const ProductData: React.FC<ProductDataProps> = ({
  product,
  onInputChange
}) => {
  const { t } = useI18n()

  return (
    <div className='product-data'>
      <Input 
        value={product.title}
        type='text'
        label={t('product.title')}
        placeholder={t('product.titlePlaceholder')}
        onChange={(e) => onInputChange('title', e)}
      />

      <Input 
        value={Number(product.price)}
        type='number'
        currency={product.currency}
        label={t('product.price')}
        placeholder={t('product.pricePlaceholder')}
        onChange={(e) => onInputChange('price', e)}
        onCurrencyChange={(e) => onInputChange('currency', e)}
      />

      <Textarea 
        value={product.description}
        label={t('product.notes')}
        placeholder={t('product.notesPlaceholder')}
        onChange={(e) => onInputChange('description', e)}
      />
    </div>
  )
}

export default ProductData