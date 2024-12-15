import '@/styles/pages/home.scss'

import { Link } from "react-router-dom"

import { handleCatch } from '@/utils/handleCatch'
import { loadProductsFromAPI, deleteProductFromAPI } from '@/api/productService'

import { useEffect, useState } from "react"
import { useI18n } from '@/i18n-context'
import { useSelector } from 'react-redux';

import { Product } from '@/types/product.types'

import Card from "@/blocks/product/Card"
import Loader from "@/components/loader/Loader"

import { PlusIcon } from "@heroicons/react/20/solid"
import TransparentLoader from '@/components/loader/TransparentLoader'
import CategotiesFilters from '@/blocks/home/dropdownFilter/DropdownFilter'
import MobileFilters from '@/blocks/home/filtrers/MobileFilter'
import { RootState } from '@/store'

const Home = () => {
  const { t } = useI18n()

  const categories = useSelector((state: RootState) => state.categories.categories);

  const [loading, setLoading] = useState<boolean>(true)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const fetchProducts = async () => {
    setLoading(true)

    try {
      const products = await loadProductsFromAPI()

      setProducts(products)
    } catch (error) {
      handleCatch(error);
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {   
    setDeleteLoading(true)

    try {
      await deleteProductFromAPI(id)

      const newProducts = products.filter((p) => p.id !== id)
      setProducts(newProducts)
    } catch (error) {
      handleCatch(error);
    } finally {
      setDeleteLoading(false)
    }
  }

  console.log(selectedCategories, ' selectedCategories')
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="home">
      <Link 
        to='/new-product'
        className="btn-outline-red with-icon ml-10 mt-4 sm:mt-0 w-60"
      >
        <PlusIcon className='w-4 h-4 mr-2 mb-1 text-[#9B0D0F]' />
        {t('product.createNewProduct')}
      </Link>

      {
        loading ? (
          <div className="cards-container loader">
            <Loader fullScreen={false} />
          </div>
        ) : (
          <div className='main'>
            <MobileFilters />
            
            <div className='filters'>
              <CategotiesFilters 
                options={categories}
                label='Categories'
                selectedIds={selectedCategories}
                onSelectionChange={setSelectedCategories}
              />
            </div>

            <div className="cards-container">
              { deleteLoading && <TransparentLoader />}

              {
                products.map((product) => (
                  <Card 
                    key={product.id}
                    product={product}
                    onDeleteProduct={deleteProduct}
                  />
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Home