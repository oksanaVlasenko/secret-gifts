import Input from '@/components/input/Input'
import '@/styles/pages/addNewProduct.scss'
import axios from 'axios'
import { useState } from 'react'
import { getToken } from '@/utils/authToken'

// Make sure that your URL is valid
const AddNewProduct: React.FC = () => {
  const token = getToken()

  const [url, setUrl] = useState<string | number | null | undefined>('')
  const [product, setProduct] = useState({
    title: '',
    price: '',
    images: []
  })

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

        setProduct({
          title: res.data.title,
          price: res.data.price,
          images: res.data.images
        })
      })
      .catch((error) => console.error('Error:', error.response?.data || error.message))
  }

  return (
    <div className="new-product">
      <h3 className="text-xl font-semibold text-[#3A412C]">
        New product
      </h3>

      <Input 
        value={url}
        onChange={handleUrl}
      />

      <button 
        className={`btn-outline-red ml-0 mt-4 sm:mt-0`}
        onClick={testFetchDataFromUrl}
      >
        Fetch data
      </button>

      {
        product.title && 
          <h3 className='text-gray-900'>{product.title}</h3>
      }

      {
        product.price && 
          <p className='text-gray-900'>{product.price}</p>
      }

      {
        product.images.length > 0 &&
        (
          product.images.map((img, ind) => (
            <img key={ind} src={img} alt='photo' className='w-24 h-24'/>
          ))
        )
      }
    </div>
  )
}

export default AddNewProduct