import { Helmet } from 'react-helmet'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import Style from  './Home.module.css'

function Home() {
  return (
    <>
        <div>
        <CategorySlider/>
        <Products/>
        </div>
    </>
  )
}

export default Home