import React,{ useEffect, useState } from 'react'
import './App.css'
import Navbar from './componets/Navbar/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Card from './pages/card/Card'
import { Cartprovider } from './componets/Context/Context_api'
import Signup from './componets/Signup/Signup'
import Login from './componets/Login/Login'
import Category from './pages/category/Category'
import FeaturedProduct from './pages/FeaturedProduct/FeaturedProduct'
import Wishlist from './pages/Wishlist/Wishlist'
import Otp_verify from './componets/Otp/Otp_verify'
import Categorys from './pages/Categorys/Categorys'
import Checkout from './pages/Checkout/Checkout'

function App() {
  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPagesize] = useState("")

  React.useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 1000);
  return () => clearTimeout(timer);
}, []);

  if (loading) return <h1 style={{ textAlign: "center", marginTop: "100px" }}>Project Demo — Loading...</h1>;

  useEffect(() => {
    let resize = () => {
      setPagesize(window.innerWidth);
    }
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <>
      <Cartprovider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Card />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/otp-verify' element={<Otp_verify />} />
            <Route path='/Category' element={<Category />} />
            <Route path='/Wishlist' element={<Wishlist pageSize={pageSize} />} />
            <Route path='/FeaturedProduct' element={<FeaturedProduct />} />
            <Route path='/Categorys' element={<Categorys />} />
            <Route path='/Checkout' element={<Checkout />} />
            {/* <Route path='/navbar' element={<Navbar />} /> */}
          </Routes>
        </Router>
      </Cartprovider>
    </>
  )
}

export default App
