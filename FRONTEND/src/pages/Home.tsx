import { Link } from "react-router-dom"

import { handleCatch } from '@/utils/handleCatch'
import axios from 'axios'
import { getToken } from '@/utils/authToken'
import { useEffect, useState } from "react"
import { Product } from '@/types/product.types'
import Card from "@/blocks/product/Card"

import '@/styles/pages/home.scss'

const Home = () => {
  const token = getToken()

  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:3000/product/',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      console.log(res.data, ' res')
      setProducts(res.data)
    })
    .catch((error) => handleCatch(error))
  }

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id)
    setProducts(newProducts)
    
    // await axios({
    //   method: 'delete',
    //   url: 'http://localhost:3000/product/',
    //   data: {id},
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   },
    // })
    // .then((res) => {
    //   console.log(res.data, ' res')
    //   const newProducts = products.filter((p) => p.id !== id)
    //   setProducts(newProducts)
    // })
    // .catch((error) => handleCatch(error))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="home">
      <h2>Home</h2>
      <Link to='/new-product'>Add New product</Link>

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
    </div>
    
  )
}

export default Home