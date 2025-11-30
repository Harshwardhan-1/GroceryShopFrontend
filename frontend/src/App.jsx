import {useEffect} from 'react';
import {Routes,Route} from 'react-router-dom';
import HomePage from './SignUpPage'
import SignInPage from './SignInPage';
import ProductsPage from './ProductsPage';
import OrderPage from './OrderPage';
import HomeProduct from './HomeProduct';
import AddToCart from './AddToCart';
import Favorites from './Favorites';
import ProfilePage from './ProfilePage';
import './App.css'

function App() {
  
useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://grocery-store-backend-2.onrender.com/ping");
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/SignInPage" element={<SignInPage />}></Route>
      <Route path="/ProductsPage" element={<ProductsPage />}></Route>
      <Route path="/ProductPage/OrderPage" element={<OrderPage />}></Route>
      <Route path="/ProductPage/OrderPage/Product" element={<HomeProduct />}></Route>
      <Route path="/ProductPage/OrderPage/Product/AddToCart" element={<AddToCart />}></Route>
      <Route path='/AddToCart/Favorites' element={<Favorites />}></Route>
      <Route path='/ProfilePage' element={<ProfilePage />}></Route>
    </Routes>
    </>
  )
}

export default App
