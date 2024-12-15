import '@/styles/pages/addNewProduct.scss'

import { useState } from 'react'

import { useI18n } from '@/i18n-context'
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { handleCatch } from '@/utils/handleCatch'

import { AppDispatch } from '@/store';
import { RootState } from '@/store';

import { createCategory, editCategory, deleteCategory } from '@/services/categoryServices'

import { Images, Product } from '@/types/product.types'
import { DropdownProps, Option } from '@/components/dropdown/Dropdown.types'

import Gallery from '@/components/gallery/Gallery'
import SearchUrl from '@/blocks/product/SearchUrlBlock'
import ProductData from '@/blocks/product/ProductData'
import Loader from '@/components/loader/Loader'

import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { createProductFromAPI, fetchProductFromAPI, uploadImagesFromAPI } from '@/api/productService';

const AddNewProduct: React.FC = () => {
  const { t } = useI18n()

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.categories.categories);

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
    return deleteCategory(dispatch, id)
  }

  const handleCreateCategory = async (newValue: string | number | null | undefined) => {
    return createCategory(dispatch, newValue)
  }

  const handleEditCategory = async (id: string | number, value: string | number | null | undefined) => {
    return editCategory(dispatch, id, value)
  }

  const dropdownCategory: DropdownProps = {
    selectedValue: product.categoryId,
    label: t('product.categoryLabel'), 
    searchPlaceholder: t('system.searchPlaceholder'),
    options: categories,
    onSelectChange: handleCategoryChange,
    onClearValue: handleClearCategoryValue,
    onCreateNewValue: handleCreateCategory,
    onDeleteOption: handleDeleteCategory,
    onEditOption: handleEditCategory
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
      const response = await uploadImagesFromAPI(formData)
  
      return response; 
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

    try {
      await createProductFromAPI(data)

      navigate('/')
    } catch (error) {
      handleCatch(error);
    } finally {
      setPending(false)
    }
  }

  const fetchDataFromUrl = async () => {
    if (!url) {
      console.error('URL is not defined');
      return;
    }
    
    setLoading(true)

    try {
      const response = await fetchProductFromAPI(url)

      setProduct(prevProduct => ({
        ...prevProduct,
        title: response.title,
        price: Number(response.price),
        images: response.images.map((img: string )=> { return {id: crypto.randomUUID(), src: img} })
      }))
    } catch (error) {
      handleCatch(error);
    } finally {
      setLoading(false)
    }
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
        onFetchData={fetchDataFromUrl}
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