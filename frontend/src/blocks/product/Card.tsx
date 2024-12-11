import { PhotoIcon, TrashIcon } from "@heroicons/react/20/solid"
import { Product } from '@/types/product.types'

import { useNavigate } from 'react-router-dom'; 

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
  const navigate = useNavigate();

  const currencySymbol = options.find(o => o.id === product.currency)?.symbol

  const handleCardClick = () => {
    navigate(`/product/${product.id}`); 
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteProduct(product.id ?? '')
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {
        !product.images.length || product.images.length === 0 ? (
          <PhotoIcon  className="image"  />
        ) : (
          <img 
            src={product.images[0].src}
            alt="Product" 
            className="image" 
          />
        )
      }
      
        
      <div className="card-body">
        <span className="category-name">
          General Category
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