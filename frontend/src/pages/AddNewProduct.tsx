//import Input from '@/components/input/Input'
import '@/styles/pages/addNewProduct.scss'
import axios from 'axios'
import { useState } from 'react'
import { getToken } from '@/utils/authToken'
import Gallery from '@/components/gallery/Gallery'
import SearchUrl from '@/blocks/product/SearchUrlBlock'
import { useI18n } from '@/i18n-context'

import { Product } from '@/types/product.types'
import ProductData from '@/blocks/product/ProductData'
// Make sure that your URL is valid
const AddNewProduct: React.FC = () => {
  const { t } = useI18n()
  const token = getToken()

  const [url, setUrl] = useState<string | number | null | undefined>('')
  const [product, setProduct] = useState<Product>({
    title: '',
    price: '',
    images: [],
    description: ''
  })

  const handleRemoveImage = (index: number) => {
    //setImages((prev) => prev.filter((_, i) => i !== index));
    const images = product.images.filter((_, i) => i !== index)

    handleInputChange('images', images)
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files, ' e')
    if (e.target.files) {
      const file = e.target.files[0]; // Отримуємо перший файл

      console.log(file, 'file')
      // Якщо файл існує
      if (file) {
        // Створюємо URL для файла
        const imageUrl = URL.createObjectURL(file);

        // Додаємо URL в стан images
        const images = [...product.images, imageUrl]
        handleInputChange('images', images)
      }
    }
    // const newImage = prompt('Введіть URL нового фото:');
    // if (newImage) {
    //   setImages((prev) => [...prev, newImage]);
    // }
  };

  const handleInputChange = (field: string, value: string | number | null | undefined | string[] ) => {  
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUrl = (e: string | number | null | undefined) => {
    setUrl(e)
  }

  const testFetchDataFromUrl = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/product/map-product',
      data: {
        url: url
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res, ' res ')

        setProduct(prevProduct => ({
          ...prevProduct,
          title: res.data.title,
          price: res.data.price,
          images: res.data.images
        }))
      })
      .catch((error) => console.error('Error:', error.response?.data || error.message))
  }

  return (
    <div className="new-product">
      <h2>
        {t('product.newProduct')}
      </h2>

      <SearchUrl 
        url={url}
        onUrlChange={handleUrl}
        onFetchData={testFetchDataFromUrl}
      />

      <div className='product-container'>
        <Gallery 
          images={product.images}
          onAddImage={handleAddImage}
          onDeleteImage={handleRemoveImage}
        />

        <ProductData 
          product={product}
          onInputChange={handleInputChange}
        />
      </div>
      
    </div>
  )
}

export default AddNewProduct