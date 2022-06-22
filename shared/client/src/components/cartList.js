import {useState, useEffect} from 'react'
import ProductCardCart from './productCardinCart';

function CartList() {

const [cartData, setCartData] = useState();

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/api/cart`)
        .then((res) => res.json())
        .then((json) => {
            setCartData(json)
    })

  },[])

function deleteCart(id){
    fetch(`${process.env.REACT_APP_API_URL}/api/cart/${id}`, {
        method: 'DELETE', // or 'PUT'
      })
      .then(response => response.json())
      .then((data) => {
        console.log('Success:', data);
        setCartData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div className="w-full h-screen">
        <h1 className='block uppercase tracking-wide text-gray-900 text-xl font-bold mb-2'>List of products in all carts</h1>
        
        {(typeof cartData === 'undefined') ? (<option>Loading</option>
            ):(
            cartData.map((cart,i)=>(
                <div key={i}>
                    <div>
                        <h2 className='font-bold'>Cart No.: {cart.id}</h2>
                        <div className='mt-5'>
                            <button onClick={() => deleteCart(cart.id)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">
                            Delete Cart
                            </button>
                        </div>
                    </div>
                    <div className='flex'>
                        {(typeof cart.products === 'undefined') ? (<option>Loading</option>
                            ):(
                                cart.products.map((product,index)=>(
                                <ProductCardCart data={product} cartId={cart.id} />
                            ))
                        )}
                    </div>

                </div>
            ))
        )}
    </div>
  );
}

export default CartList;