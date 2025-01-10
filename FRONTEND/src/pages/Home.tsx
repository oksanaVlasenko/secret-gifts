import '@/styles/pages/home.scss'

import { Link } from "react-router-dom"

import { handleCatch } from '@/utils/handleCatch'
import { loadProductsFromAPI, deleteProductFromAPI } from '@/api/productService'

import { useEffect, useState } from "react"
import { useI18n } from '@/i18n-context'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Product } from '@/types/product.types'
import { Filter, FilterProps } from '@/blocks/home/filters/Filter.types'

import Card from "@/blocks/product/Card"
import Loader from "@/components/loader/Loader"

import { PlusIcon } from "@heroicons/react/20/solid"
import TransparentLoader from '@/components/loader/TransparentLoader'

import { FilterProvider } from '@/context/filtersContext'

import { RootState } from '@/store'
import GeneralFilters from '@/blocks/home/filters/GeneralFilters'
import EmptyState from '@/blocks/product/EmptyState'

const Home = () => {
  const { t } = useI18n()
  const navigate = useNavigate();

  const categories = useSelector((state: RootState) => state.categories.categories);

  const [loading, setLoading] = useState<boolean>(true)
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])

  const [isFilterUse, setIsFilterUse] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filter>({
    categories: [],
    minPrice: 0,
    maxPrice: 0,
    searchText: ''
  })

  const fetchProducts = async (filtersObject?: Filter) => {
    setTableLoading(true)

    try {
      const products = await loadProductsFromAPI(filtersObject)

      setProducts(products)
    } catch (error) {
      handleCatch(error);
    } finally {
      setTableLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {   
    setTableLoading(true)

    try {
      await deleteProductFromAPI(id)

      const newProducts = products.filter((p) => p.id !== id)
      setProducts(newProducts)
    } catch (error) {
      handleCatch(error);
    } finally {
      setTableLoading(false)
    }
  }

  const handleFiltersSelect = (field: string, values: string[] | string | number | null | undefined) => {
    setIsFilterUse(true)

    setFilters(prevFilters => {
      const updatedFilters = { 
        ...prevFilters, 
        [field]: values 
      };

      fetchProducts(updatedFilters); 

      return updatedFilters;
    });
  }

  const handleMobileFiltersSelect = (filtersObject: Filter) => {
    setFilters(filtersObject)
    
    fetchProducts(filtersObject)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      minPrice: 0,
      maxPrice: 0,
      searchText: ''
    };

    setFilters(resetFilters);
    fetchProducts(resetFilters);

    setIsFilterUse(false)
  }

  const filtersData: FilterProps = {
    filters: filters,
    categoriesList: categories,
    onSelectChange: handleFiltersSelect,
    onMobileSelect: handleMobileFiltersSelect,
    onResetFilters: handleResetFilters
  }

  const handleCreateNewWish = () => {
    navigate('/new-product')
  }

  useEffect(() => {
    fetchProducts()
      .then(() => setLoading(false))
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
          <div className="loader">
            <Loader fullScreen={false} />
          </div>
        ) : (
          <div className='main'>
            {
              (products.length > 0 || isFilterUse) && (
                <FilterProvider value={filtersData}>
                  <GeneralFilters />
                </FilterProvider>
              )
            }
            
            {
              products && products.length > 0 ? (
                <div className="cards-container">
                  { tableLoading && <TransparentLoader />}

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
                ) : (
                  <EmptyState 
                    isFilterUse={isFilterUse}
                    onResetFilter={handleResetFilters}
                    onCreateNewWish={handleCreateNewWish}
                  />
              )
            }   
          </div>
        )
      }
    </div>
  )
}

export default Home