import {useState, useEffect} from 'react'

function ProductCardCart(props) {

  let newProduct = {
    "name": props.data.name,
    "description": props.data.description,
    "code": props.data.code,
    "stock": props.data.stock,
    "price": props.data.price,
    "photo": props.data.photo 
  }

  const [showModal, setShowModal] = useState(false);
  const [cartList, setCartList] = useState();

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/api/cart`)
        .then((res) => res.json())
        .then((json) => {
            setCartList(json)
        })
  },[])

  function deleteCartProduct(objId, productId){
    fetch(`${process.env.REACT_APP_API_URL}/api/cart/${objId}/products/${productId}`, {
        method: 'DELETE', // or 'PUT'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCartList();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="max-w-sm w-1/3 m-2">
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <img className="w-full h-20 object-cover rounded-full mr-4" src={props.data.photo} alt="product" />
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">{props.data.name}</div>
              <p className="text-gray-700 text-base">{props.data.description}</p>
            </div>
            <div className="flex items-center mb-5">
              <div className="text-sm">
                  <p className="text-gray-900 leading-none">$ {props.data.price}</p>
                  <p className="text-gray-600">In Stock: {props.data.stock}</p>
              </div>
            </div>
        <button onClick={() => deleteCartProduct(props.cartId, props.data.id)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">
          Delete Product
        </button>
        </div>

    </div>
  );
}

export default ProductCardCart;