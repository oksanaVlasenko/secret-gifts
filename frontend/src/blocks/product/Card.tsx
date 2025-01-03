import { PhotoIcon, TrashIcon } from "@heroicons/react/20/solid"
import { Product } from '@/types/product.types'

import { useNavigate } from 'react-router-dom'; 
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "@/store";
import { useI18n } from '@/i18n-context'

interface CardProps {
  product: Product,
  onDeleteProduct: (id: string) => void
}

const options = [
  {
    id: 'uah',
    label: 'UAH ₴',
    symbol: '₴'
  },
  {
    id: 'usd',
    label: 'USD $',
    symbol: '$'
  },
  {
    id: 'eur',
    label: 'EUR €',
    symbol: '€'
  },
]

const Card: React.FC<CardProps> = ({product, onDeleteProduct}) => {
  const { t } = useI18n()

  const categories = useSelector((state: RootState) => state.categories.categories);

  const [isLoaded, setIsLoaded] = useState(false);
  
  const navigate = useNavigate();

  const currencySymbol = options.find(o => o.id === product.currency)?.symbol

  const categoriesName = categories.find(c => c.id === product.categoryId)?.label ?? t('product.withoutCategory')

  const handleCardClick = () => {
    navigate(`/product/${product.id}`); 
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteProduct(product.id ?? '')
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {!isLoaded && <div className="placeholder animate-pulse"></div>}

      {
        !product.images.length || product.images.length === 0 ? (
          <PhotoIcon  className="image"  />
        ) : (
          <img 
            src={product.images[0].src}
            alt="Product" 
            className={`image ${isLoaded ? 'fade-in' : 'hidden-img'}`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        )
      }
      
        
      <div className="card-body">
        <span className="category-name">
          { categoriesName }
        </span>
          
        <p className="product-name" title={String(product.title)}>
          {product.title}
        </p>
          
        <div className="flex items-center">
          <p className="product-price">
            {currencySymbol} {product.price}
          </p>
              
          <div className="ml-auto">
            <TrashIcon 
              className="text-[#9B0D0F] w-4 h-4" 
              onClick={handleDeleteClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card