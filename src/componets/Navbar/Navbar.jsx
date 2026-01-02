import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './navbar.css'
import img from '../../images/car_img1.webp'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../Alert/Alert'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
// import jwt from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode";
import { ChevronDown, Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { CartContext } from '../Context/Context_api'

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [login_user, setLoginuser] = useState("")
  const [alertmsg, setAlertmsg] = useState("")
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState("")
  const [navCollapse, setNavCollapse] = useState(false)
  const [menusShow, setMenuShow] = useState(false)
  const [submenuShow, setSubmenushow] = useState(false)

  const { addedItems } = useContext(CartContext);

  const openToggleSignup = () => {
    setShowLogin(false);
    setShowSignup(prev => !prev);
  };

  const openToggleLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  useEffect(() => {
    let urlmsg = window.location.search;
    let message = urlmsg.substring(1)
    message = decodeURIComponent(message)
    if (message.includes("q") || message.includes("payment")) {
      setAlertmsg("")
    }
    else {
      setAlertmsg(message)
    }
  }, [])

  const token = localStorage.getItem("logintoken");
  const [user, setUser] = useState("")

  useEffect(() => {
    if (!token) {
      setUser(null)
      return;
    }
    try {
      let decode = jwtDecode(token)
      setUser({
        username: decode.username,
        email: decode.useremail
      })
    }
    catch (error) {
      console.error(`Error token decode: ${error}`)
      localStorage.removeItem("logintoken")
      setUser(null)
    }
  }, [])

  let logout = () => {
    localStorage.removeItem("logintoken")
    window.location.href = `/?Logout Successfully`
  }

  useEffect(() => {
    const update = () => {
      setWindowWidth(window.outerWidth);
      if (window.outerWidth >= 480) {
        setNavCollapse(false)
      }
      else {
        setNavCollapse(true)
      }
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [])

  const navtoggle = () => {
    setMenuShow(!menusShow); // toggle menu
  };

  return (
    <>
      <div className={`nav ${menusShow && "nav_open"} ${submenuShow && "submenu-show"}`}>
        {navCollapse && (
          <Menu onClick={navtoggle} className={`${navCollapse ? "menu_icon_show" : "menu_icon_hide"}`}
          />
        )}
        <div className="header">
          <p className="ecomm_name"><Link to={"/"}>NEHSH</Link></p>

          <div className="shopping_cart">
            <ShoppingCart />
            <p>
              <Link to={"/cart"}>Cart</Link>
            </p>
            <span className={`cart_badge ${addedItems.length > 0 ? "cart_badge_show" : "cart_badge_hide"}`}>{addedItems.length > 0 ? addedItems.length : ""}</span>
          </div>
        </div>

        <div className={`${navCollapse ? "menus_show" : "menus"}`} >

          <div className="header_search">
            <div className="types">
              <select name="types" id="types">
                <option value="All">All Products</option>
                <option value="electronic">Electronic</option>
                <option value="sports">Sports</option>
                <option value="cloths">Cloths</option>
              </select>
            </div>

            <div className="search_input">
              <input type="text" name="search_input" id="search_input" placeholder="Search for products,brand and more..." />
            </div>
            <button className="search_btn"><Search width={20} stroke="white" className="search_icon" /></button>
          </div>
        </div>

        <div className={`${menusShow ? "menu_ul_show" : "menu_ul_hide"} header_option`}>
          <div
            className={`menuUlSignup `} >
            <button onClick={() => setSubmenushow(!submenuShow)}>
              <User />
              <p>
                Account
              </p>
              {windowWidth <= 480 && (
                <ChevronDown />
              )}
            </button>
            <div className={`account_submenu `}>
              <span className="submenu_arrow"></span>
              {user ? (
                <p className="navUsername" onClick={logout}>
                  {user.username}
                </p>
              ) : <p onClick={openToggleLogin} className="navLogin">Login</p>}

              {user && user.username && (
                <>
                  <p className="submenu_item" onClick={() => { setMenuShow(!menusShow); setSubmenushow(!submenuShow) }} ><Link to={"/"}>My Profile</Link></p>
                  <p className="submenu_item" onClick={() => { setMenuShow(!menusShow); setSubmenushow(!submenuShow) }} >My Orders</p>
                  <p className="submenu_item logout" onClick={() => { setMenuShow(!menusShow); setSubmenushow(!submenuShow) }} >
                  </p>
                </>
              )}
            </div>
          </div>

          <Link to={"/Wishlist"} onClick={() => setMenuShow(!menusShow)}>
            <button>
              <Heart />
              <p>
                Wishlist
              </p>
            </button>
          </Link>

          <Link to={"/cart"} onClick={() => setMenuShow(!menusShow)}>
            <button className="optioncart">
              <ShoppingCart />
              <p>
                Cart
              </p>
              <span className={`cart_badge ${addedItems.length > 0 ? "cart_badge_show" : "cart_badge_hide"}`}>{addedItems.length > 0 ? addedItems.length : ""}</span>
            </button>
          </Link>
        </div>
      </div>
      {alertmsg && <Alert msg={alertmsg} />}
      <Signup onLoginClick={openToggleLogin} onSignupShow={showSignup} onClose={() => setShowSignup(false)} />
      <Login onSignupClick={openToggleSignup} onLoginShow={showLogin} onClose={() => setShowLogin(false)} />

      <div className="categorys">
        <span><Link>All Categories</Link></span>
        <span><Link>Today's Deals</Link></span>
        <span><Link>Electronic</Link></span>
        <span><Link>Sports & Fitness</Link></span>
        <span><Link>Fashion</Link></span>
      </div>
    </>
  )
}

export default Navbar
