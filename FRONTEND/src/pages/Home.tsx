import { Link } from "react-router-dom"

import { handleCatch } from '@/utils/handleCatch'
import axios from 'axios'
import { getToken } from '@/utils/authToken'
import { useEffect, useState } from "react"
import { useI18n } from '@/i18n-context'

import { Product } from '@/types/product.types'
import Card from "@/blocks/product/Card"

import '@/styles/pages/home.scss'
import Loader from "@/components/loader/Loader"
import { PlusIcon } from "@heroicons/react/20/solid"

import { loadProducts } from '@/api/productService'

const Home = () => {
  const { t } = useI18n()
  const token = getToken()

  const [loading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    setLoading(true)

    try {
      const products = await loadProducts()

      setProducts(products)
    } catch (error) {
      handleCatch(error);
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {   
    await axios({
      method: 'delete',
      url: 'http://localhost:3000/product/',
      data: {id},
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then(() => {
      const newProducts = products.filter((p) => p.id !== id)
      setProducts(newProducts)
    })
    .catch((error) => handleCatch(error))
  }

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
          <div className="cards-container">
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
        )
      }
    </div>
  )
}

export default Home