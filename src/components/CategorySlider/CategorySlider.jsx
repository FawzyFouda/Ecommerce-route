import { useQuery } from 'react-query'
import    './CategorySlider.css'
import axios from 'axios'
import Slider from "react-slick";
import SliderImg1 from "../../assets/images/grocery-banner-2.jpeg";
import SliderImg2 from "../../assets/images/slider-image-1.jpeg";
import SliderImg3 from "../../assets/images/slider-image-2.jpeg";

function CategorySlider() {
  var settings1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    customPaging: i => (
      <div
        style={{
          width: "30px",
          height:"10px",
          borderRadius:"2px",
          color: "blue",
          background:"#D6D6D6",
          margin:'8px 5px'
        }}
      >
      
      </div>
    )
  };
  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows : false,

  };
  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {isLoading, isError, data} = useQuery('ategorySlider',getCategories)
  return (
    <>
    <div className='container'>
    <div className='d-flex justify-content-center mb-5 slider-top'>
      
<div className='col-md-6 me-3 slider-left'>
    <Slider {...settings2}>
      <div>
       <img src={SliderImg2} className='w-100' height={408} alt="" />
      </div>
      <div>
      <img src={SliderImg3} className='w-100' height={408} alt="" />
      </div>
    </Slider>
    </div>
    <div className='col-md-4  d-flex flex-column slider-right'>
      <img src={SliderImg1} className='mb-3' alt="" height={200}/>
      <img src={SliderImg2} className=''  alt="" height={200}/>
    </div>
    </div>
    </div>

    <div className='container'>
    {data?.data.data?<Slider {...settings1}>
      {
        data?.data.data.map((category) => 
        <>
            <img className='w-100' height={200} src={category.image}></img>
        </>
        )
      }
    </Slider>:''}
    </div>
 
    </>
  )
}

export default CategorySlider