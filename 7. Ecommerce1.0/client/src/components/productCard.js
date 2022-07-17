import {useState, useEffect} from 'react'

function ProductCard(props) {
  console.log(props.data);
  
  let newProduct = {
    "id": props.data.id,
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

  const saveCart = event =>{
    event.preventDefault()
    const id = event.target.cartId.value
    // ` 
    fetch(`${process.env.REACT_APP_API_URL}/api/cart/${id}/products`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
    document.getElementById("cartForm").reset();
    setShowModal(false)
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
            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              Add to Cart
            </button>
        </div>

        <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add to Cart
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form onSubmit={saveCart} className="w-full max-w-lg center" id="cartForm">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Select cart
                      </label>
                      <select className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded leading-tight focus:outline-none focus:bg-white' name='cartId'>
                        {(typeof cartList === 'undefined') ? (<option>Loading</option>
                          ):(
                            cartList.map((cart,i)=>(
                                <option key={i} value={cart.id}>{cart.id}</option>
                            ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    </div>
                      <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        add
                      </button>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    </div>
                  </div>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>

    </div>
  );
}

export default ProductCard;