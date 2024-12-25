import '@/styles/pages/editProduct.scss'

import { useEffect, useState } from 'react';

import { useI18n } from '@/i18n-context'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { handleCatch } from '@/utils/handleCatch'

import { AppDispatch } from '@/store';
import { RootState } from '@/store';

import { 
  createCategory, 
  editCategory, 
  deleteCategory 
} from '@/services/categoryServices'
import { 
  editProductFromAPI, 
  fetchProductByIdFromAPI, 
  fetchProductFromAPI, 
  uploadImagesFromAPI 
} from '@/api/productService';

import { Images, Product } from '@/types/product.types'
import { DropdownProps } from '@/components/dropdown/Dropdown.types'

import { ChevronLeftIcon } from '@heroicons/react/16/solid';

import Loader from '@/components/loader/Loader';
import SearchUrl from '@/blocks/product/SearchUrlBlock';
import Gallery from '@/components/gallery/Gallery';
import ProductData from '@/blocks/product/ProductData';

const EditProduct: React.FC = () => {
  const { t } = useI18n()
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.categories.categories);

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
    categoryId: null,
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

  const fetchProductById = async () => {
    setInitialLoading(true)

    try {
      const response = await fetchProductByIdFromAPI(id)

      setUrl(response.url)

      setProduct(prev => ({
        ...prev,
        title: response.title,
        price: Number(response.price),
        images: response.images,
        description: response.description,
        currency: response.currency,
        categoryId: response.categoryId
      }))
    } catch (error) {
      handleCatch(error);
    } finally {
      setInitialLoading(false)
    }
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

  const openLinkInNewWindow = () => {
    window.open(String(url), '_blank', 'noopener,noreferrer');
  };

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

    try {
      await editProductFromAPI(id, data)

      navigate('/')
    } catch (error) {
      handleCatch(error);
    } finally {
      setPending(false)
    }
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
              <div className='btn-container'>
                <button 
                  type="button" 
                  className={`btn-outline-red product-btn ${pending ? 'pending-animation' : ''}`}
                  onClick={openLinkInNewWindow}
                >
                  {t('product.watchProduct')}
                </button>

                <button 
                  type="button" 
                  className={`btn-filled-red product-btn ${pending ? 'pending-animation' : ''}`}
                  onClick={saveProduct}
                >
                  {t('product.editWish')}
                </button>
              </div>
            </ProductData>
          </div>
        )
      }
    </div>
  )
}

export default EditProduct