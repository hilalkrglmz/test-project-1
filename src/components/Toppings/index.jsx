import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Toppings = () => {
const [data, setData] =useState([])
const [basket, setBasket] = useState([])

useEffect(() => {
  axios.get('http://localhost:4000/toppings')
  .then((res) => setData(res.data))

}, [])

/* tiklenmişse sepete ekler değilse çıkarır */
const handleChange= (e,item) => {
  e.target.checked ? setBasket([...basket, item]) 
  : setBasket(basket.filter((i) => i.name !== item.name));
} 


  return (
    <div className='container'>
      <h1>Sos Çeşitleri</h1>
      <p>Tanesi: <span className='text-success'>3₺</span></p>
      <h3>Soslar Ücreti: {' '} <span>{basket.length * 3} ₺</span></h3>
      <div className='row gap-3 p-4 '>
        {data.map((i) => (
        <div 
        className='d-flex flex-column align-items-center py-4 rounded-5 top-card'
        style={{width: '150px'}}>
          <label 
          className='d-flex flex-column align-items-center gap-3'
          htmlFor={i.name}>
          <img height={100} src={i.imagePath} alt='sos-resim'/>
          <p className='text-center text-nowrap'> {i.name}</p>
          </label>
          <input 
          onChange={(e) => handleChange(e, i)} 
          id={i.name} type="checkbox" />
        </div>) 
        )}
      </div>
    </div>
  )
}

export default Toppings