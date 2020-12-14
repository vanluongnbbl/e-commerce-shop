
import './App.css';
import { useEffect } from 'react'
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar'
import { commerce } from './lib/commerce'
import { useState } from 'react';
function App() {
  const [products, setProducts] = useState()


  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  console.log(products)

  return (
    <div className="App">
      <Products products={products} />
      <Navbar />
    </div>
  );
}

export default App;
