import '@/styles/pages/editProduct.scss'

import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n-context'
import { useParams } from 'react-router-dom';

import { getToken } from '@/utils/authToken'
import { handleCatch } from '@/utils/handleCatch'

import { Images, Product } from '@/types/product.types'
import { DropdownProps } from '@/components/dropdown/Dropdown.types'

import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '@/components/loader/Loader';
import SearchUrl from '@/blocks/product/SearchUrlBlock';
import Gallery from '@/components/gallery/Gallery';
import ProductData from '@/blocks/product/ProductData';


const EditProduct: React.FC = () => {
  const { t } = useI18n()
  const token = getToken()
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [pending, setPending] = useState<boolean>(false)

  const [url, setUrl] = useState<string | number | null | undefined>('')
  const [product, setProduct] = useState<Product>({
    title: '',
    price: '',
    images: [],
    description: '',
    currency: 'uah',
    category: null,
    wishlist: null
  })
  const [customImages, setCustomImages] = useState<File[]>([])
  const [deletedImages, setDeletedImages] = useState<Images[]>([])

  useEffect(() => {
    fetchProductById()
  }, [])

  
  const options = [
    {
      "id": 3,
      "label": "Item 3 lorem75 lorem96 lorem65",
      "disabled": false
    },
    {
      "id": 4,
      "label": "Item 3 lorem75 lorem96 lorem65",
      "disabled": false
    },
  ]

  const handleCategoryChange = (newSelectedValue: string | number  | null) => {
    handleInputChange('category', newSelectedValue); 
  }

  const handleClearCategoryValue = () => {
    handleInputChange('category', null); 
  }

  const handleWishlistChange = (newSelectedValue: string | number  | null) => {
    handleInputChange('wishlist', newSelectedValue); 
  }

  const handleClearWishlistValue = () => {
    handleInputChange('wishlist', null); 
  }

  const dropdownCategory: DropdownProps = {
    selectedValue: product.category,
    label: t('product.categoryLabel'), 
    searchPlaceholder: t('system.searchPlaceholder'),
    options,
    onSelectChange: handleCategoryChange,
    onClearValue: handleClearCategoryValue,
  };

  const dropdownWishlist: DropdownProps = {
    selectedValue: product.wishlist,
    label: t('product.wishListLabel'), 
    searchPlaceholder: t('system.searchPlaceholder'),
    options,
    onSelectChange: handleWishlistChange,
    onClearValue: handleClearWishlistValue,
  };

  const goBack = () => {
    navigate(-1); 
  };

  const fetchProductById = async () => {
    setInitialLoading(true)

    await axios({
      method: 'get',
      url: `http://localhost:3000/product/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      setUrl(res.data.url)
      setProduct(prev => ({
        ...prev,
        title: res.data.title,
        price: Number(res.data.price),
        images: res.data.images,
        description: res.data.description,
        currency: res.data.currency
      }))
    })
    .catch((error) => handleCatch(error))
    .finally(() => setInitialLoading(false))
  }

  const handleRemoveImage = (id: string) => {
    const deleted = product.images.find(i => i.id === id)

    if (deleted && deleted.src.includes('cloudinary')) setDeletedImages([...deletedImages, deleted])

    const images = product.images.filter((i) => i.id !== id)

    handleInputChange('images', images)
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); 
      const newCustomImages = [...customImages];
      const newProductImages = [...product.images];
  
      files.forEach((file) => {
        newCustomImages.push(file); 
  
        const imageUrl = URL.createObjectURL(file); 
        newProductImages.push({ src: imageUrl, id: crypto.randomUUID() }); 
      });
  
      setCustomImages(newCustomImages); 
      handleInputChange('images', newProductImages); 
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
  
      return response.data; 
    } catch (error) {
      handleCatch(error);
      throw error; 
    }
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

  const saveProduct = async () => {
    setPending(true)

    let newImages = []

    if (customImages && customImages.length > 0) {
      newImages = await uploadCustomImages();
    }

    const images = product.images.filter(i => !i.src.includes('blob:'))

    const data = {
      ...product,
      images:  [...new Set([...images, ...newImages])],
      url,
      deletedImages: deletedImages,
    }

    await axios({
      method: 'patch',
      url: `http://localhost:3000/product/edit/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then(() => {
      navigate('/')
    })
    .catch((error) => handleCatch(error))
    .finally(() => setPending(false))
  }
 
  if (initialLoading) {
    return <Loader />
  }

  return (
    <div className='edit-product'>
      <div className='header'>
        <ChevronLeftIcon 
          className='w-10 h-10 text-[#9B0D0F] cursor-pointer' 
          onClick={goBack}
        />

        <h2>
          {t('product.editWish')}
        </h2>
      </div>

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
              dropdownCategory={dropdownCategory}
              dropdownWishlist={dropdownWishlist}
              onInputChange={handleInputChange}
            >
              {/* ${pending ? 'pending-animation' : ''} */}
              <button 
                type="button" 
                className={`btn-filled-red product-btn ${pending ? 'pending-animation' : ''}`}
                onClick={saveProduct}
              >
                {t('product.editWish')}
              </button>
            </ProductData>
          </div>
        )
      }
    </div>
  )
}

export default EditProduct