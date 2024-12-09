//import Input from '@/components/input/Input'
import '@/styles/pages/addNewProduct.scss'
import axios from 'axios'
import { useState } from 'react'
import { getToken } from '@/utils/authToken'
import Gallery from '@/components/gallery/Gallery'
import SearchUrl from '@/blocks/product/SearchUrlBlock'
import { useI18n } from '@/i18n-context'

import { Images, Product } from '@/types/product.types'
import ProductData from '@/blocks/product/ProductData'
import Loader from '@/components/loader/Loader'
import { handleCatch } from '@/utils/handleCatch'
// Make sure that your URL is valid
const AddNewProduct: React.FC = () => {
  const { t } = useI18n()
  const token = getToken()

  const [url, setUrl] = useState<string | number | null | undefined>('')
  const [product, setProduct] = useState<Product>({
    title: '',
    price: '',
    images: [],
    description: '',
    currency: 'uah'
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [pending, setPending] = useState<boolean>(false)

  const [customImages, setCustomImages] = useState<File[]>([])

  const handleRemoveImage = (id: string) => {
    const images = product.images.filter((i) => i.id !== id)

    handleInputChange('images', images)
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]; 

      setCustomImages([...customImages, file])

      if (file) {
        const imageUrl = URL.createObjectURL(file);

        const images = [...product.images, { src: imageUrl, id: crypto.randomUUID() }]
        handleInputChange('images', images)
      }
    }
  };

  const handleInputChange = (field: string, value: string | number | null | undefined | Images[] ) => {  
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUrl = (e: string | number | null | undefined) => {
    setUrl(e)
  }

  const uploadCustomImages = async () => {
    const formData = new FormData();

    if (customImages && customImages.length > 0) {
      customImages.forEach((img) => formData.append('images', img))
    } else {
      console.error('File is undefined');
      return
    }

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/product/images',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data, ' res');
      return response.data; // Повертаємо response.data
    } catch (error) {
      handleCatch(error);
      throw error; // Прокидуємо помилку, якщо вона є
    }
  }

  const createProduct = async () => {
    setPending(true)

    let newImages = []

    if (customImages && customImages.length > 0) {
      newImages = await uploadCustomImages();
    }

    console.log(newImages, ' new images')

    const data = {
      ...product,
      images:  [...new Set([...product.images, ...newImages])],
      url
    }

    await axios({
      method: 'post',
      url: 'http://localhost:3000/product/create',
      data: {
        data
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      console.log(res.data, ' res')
    })
    .catch((error) => handleCatch(error))
    .finally(() => setPending(false))
  }

  const testFetchDataFromUrl = async () => {
    setLoading(true)

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
        setProduct(prevProduct => ({
          ...prevProduct,
          title: res.data.title,
          price: Number(res.data.price),
          images: res.data.images.map((img: string )=> { return {id: crypto.randomUUID(), src: img} })
        }))
      })
      .catch((error) => handleCatch(error))
      .finally(() => setLoading(false))
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

      {
        loading 
        ? (
          <div className='product-container loader'>
            <Loader 
              fullScreen={false}
            />
          </div>
        )
        : (
          <div className='product-container'>
            <Gallery 
              images={product.images}
              onAddImage={handleAddImage}
              onDeleteImage={handleRemoveImage}
            />

            <ProductData 
              product={product}
              onInputChange={handleInputChange}
            >
              <button 
                type="button" 
                className={`btn-filled-red product-btn ${pending ? 'pending-animation' : ''}`}
                onClick={createProduct}
              >
                create
              </button>
            </ProductData>
          </div>
        )
      }

      
      
    </div>
  )
}

export default AddNewProduct