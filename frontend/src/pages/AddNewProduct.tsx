import '@/styles/pages/addNewProduct.scss'

import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n-context'
import { useNavigate } from 'react-router-dom';

import { getToken } from '@/utils/authToken'
import { handleCatch } from '@/utils/handleCatch'

import { Images, Product } from '@/types/product.types'
import { DropdownProps, Option } from '@/components/dropdown/Dropdown.types'

import Gallery from '@/components/gallery/Gallery'
import SearchUrl from '@/blocks/product/SearchUrlBlock'
import ProductData from '@/blocks/product/ProductData'
import Loader from '@/components/loader/Loader'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

const AddNewProduct: React.FC = () => {
  const { t } = useI18n()
  const token = getToken()
  const navigate = useNavigate();

  const [url, setUrl] = useState<string | number | null | undefined>('')
  const [product, setProduct] = useState<Product>({
    title: '',
    price: '',
    images: [],
    description: '',
    currency: 'uah',
    categoryId: null,
    wishlist: null
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [pending, setPending] = useState<boolean>(false)
  const [categories, setCategories] = useState<Option[]>([])

  const [customImages, setCustomImages] = useState<File[]>([])

  const options: Option[] = [
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

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCategoryChange = (newSelectedValue: string | number  | null) => {
    handleInputChange('categoryId', newSelectedValue); 
  }

  const handleClearCategoryValue = () => {
    handleInputChange('categoryId', null); 
  }

  const handleWishlistChange = (newSelectedValue: string | number  | null) => {
    handleInputChange('wishlist', newSelectedValue); 
  }

  const handleClearWishlistValue = () => {
    handleInputChange('wishlist', null); 
  }

  const handleDeleteCategory = async (id: string | number) => {
    try {
      const res = await axios({
        method: 'delete',
        url: 'http://localhost:3000/category/',
        data: { id },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log(res.data, 'res create new');
      await fetchCategories();
      return { success: true };
    } catch (error) {
      handleCatch(error);

      let errorMessage: string = ''
      
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          errorMessage = 'Not unique value'
        }
      } 

      return { success: false, error: errorMessage };
    }
  }

  const handleCreateCategory = async (newValue: string | number | null | undefined) => {
    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/category/create',
        data: { name: newValue },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log(res.data, 'res create new');
      await fetchCategories();
      return { success: true };
    } catch (error) {
      handleCatch(error);

      let errorMessage: string = ''
      
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          errorMessage = 'Not unique value'
        }
      } 

      return { success: false, error: errorMessage };
    }
  }

  const dropdownCategory: DropdownProps = {
    selectedValue: product.categoryId,
    label: t('product.categoryLabel'), 
    searchPlaceholder: t('system.searchPlaceholder'),
    options: categories,
    onSelectChange: handleCategoryChange,
    onClearValue: handleClearCategoryValue,
    onCreateNewValue: handleCreateCategory,
    onDeleteOption: handleDeleteCategory
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

  const handleRemoveImage = (id: string) => {
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

  const createProduct = async () => {
    setPending(true)

    let newImages = []

    if (customImages && customImages.length > 0) {
      newImages = await uploadCustomImages();
    }

    const images = product.images.filter(i => !i.src.includes('blob:'))

    const data = {
      ...product,
      images:  [...new Set([...images, ...newImages])],
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
      navigate('/')
    })
    .catch((error) => handleCatch(error))
    .finally(() => setPending(false))
  }

  const fetchCategories = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:3000/category/',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res.data, ' all categories')
        if (res.data && res.data.length > 0) {
          setCategories(res.data.map((c: { '_id': string, 'name': string }) => {
            return {
              id: c._id,
              label: c.name,
              deleteIcon: true,
              editIcon: true
            }
          }))
        }
      })
      .catch((error) => handleCatch(error))
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
      <div className='header'>
        <ChevronLeftIcon 
          className='w-10 h-10 text-[#9B0D0F] cursor-pointer' 
          onClick={goBack}
        />

        <h2>
          {t('product.newProduct')}
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
              <button 
                type="button" 
                className={`btn-filled-red product-btn ${pending ? 'pending-animation' : ''}`}
                onClick={createProduct}
              >
                {t('product.createNewProduct')}
              </button>
            </ProductData>
          </div>
        )
      }
    </div>
  )
}

export default AddNewProduct