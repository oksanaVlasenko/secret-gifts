import './App.css'
import Login from './pages/Login'
import { GiftIcon } from '@heroicons/react/20/solid';

function App() {

  

  return (
    <>
      <div className='logo'>
        <GiftIcon className='logo-icon'/>
      </div>

      <Login />
      
    </>
  )
}

export default App
