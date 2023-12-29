import axios from "axios"
import { useEffect, useState } from "react"
import Card from "../Card"

const Scoops = () => {

  const [data,setData] = useState([])
  const [basket, setBasket] = useState([])


  useEffect(() => {
    axios.get('http://localhost:4000/scoops')
    .then((res) => setData(res.data))
    }, [])


  return (
    <div className="container my-5 justify-content-between mt-4 p-3">
      <h1>Dondurma Çeşitleri</h1>
      <p>
        Tanesi: <span className="text-success">20₺</span>
      </p>
      <h3>Çeşitler ücreti <span className="text-success">{basket.length* 20}₺</span>
      </h3>
      <div className="row gap-5 mt-2">
        {data.map((item) =><Card setBasket={setBasket} basket={basket} item={item} key={item.name}
        />)}
      </div>
    </div>
  )
}

export default Scoops