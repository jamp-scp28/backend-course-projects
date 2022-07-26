import {useState, useEffect} from 'react'

function ProductsForm() {
  const [formData, setFormData] = useState();
  const [productSave, setProductSave] = useState();

  const addCart = () => {

    fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  const handleSubmit = event => {
    event.preventDefault();
    
    let newProduct = {
      "name": event.target.name.value,
      "description": event.target.description.value,
      "code": event.target.code.value,
      "stock": event.target.stock.value,
      "price": event.target.price.value,
      "photo": event.target.photo.value 
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/products`, {
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

    document.getElementById("productForm").reset();
  }

  return (
    <div className='w-full max-w-sm w-3/3 m-2'>
      

      <form onSubmit={handleSubmit} className="w-full max-w-lg center" id="productForm">
      <h2 className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Add New Product</h2>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Product Name
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="product name" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Description
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text" placeholder="product's description" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            code
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="code" type="text" placeholder="Any code" />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            stock
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="stock" type="number" placeholder="100" />        
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            price
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="price" type="number" placeholder="12000" />        
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            photo
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="photo" type="text" placeholder="img.jpg" />
          <p className="text-gray-600 text-xs italic">Enter URL</p>
        </div>
      </div>
      <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save Product
      </button>
    </form>

    <div className='mt-5'>
     <button onClick={addCart} className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
       Add New Cart
      </button>
    </div>
  </div>
  );
}

export default ProductsForm;
