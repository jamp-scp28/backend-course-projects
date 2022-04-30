import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const [products, setProducts] = useState()

  useEffect(()=>{

    fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then((json) => {
            setProducts(json)
        })
      },[])
  console.log(products)
  return (
    <div className="App">
    {(typeof products === 'undefined') ? (<h1>Loading</h1>
    ):(
      products.map((val,i)=>(
        <h1 key={i}>{val.title}</h1>
      ))
    )}
    </div>
  );
}

export default App;

