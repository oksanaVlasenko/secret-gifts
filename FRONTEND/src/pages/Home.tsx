import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Link to='/new-product'>Add New product</Link>
    </div>
    
  )
}

export default Home