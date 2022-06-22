import {useState, useEffect} from 'react'
import ProductCard from '../components/productCard'

function Home() {
    const [products, setProducts] = useState()
    
    console.log(process.env.REACT_APP_CLIENT_ID);
    console.log(process.env.REACT_APP_KEY);

    useEffect(()=>{

        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then((res) => res.json())
            .then((json) => {
                setProducts(json)
            })
        },[])

  return (
    <div className="flex flex-wrap items-center">
        {(typeof products === 'undefined') ? (<h1>Loading</h1>
      ):(
        products.map((product,i)=>(
            <ProductCard key={i} data={product}/>
        ))
      )}

    </div>
  );
}

export default Home;