import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import './Navbar.css'
import { BadgeIndianRupee, ChartNoAxesCombined, ChevronDown, LayoutDashboard, Package, PanelLeftClose, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import logo from '../images/logo.png'

const Navbar = ({ currentPage, setCurrentPage, setCollapse, collapse }) => {
  const token = localStorage.getItem("logintoken");
  const [user, setUser] = useState("")
  const [screenSize, setScreenSize] = useState(null)
  const [subMenus, setSubmenus] = useState(false)

  useEffect(() => {
    console.log("Submenus value: " + subMenus)
  }, [subMenus])

  useEffect(() => {
    if (!token) {
      setUser(null)
      return;
    }
    try {
      let decode = jwtDecode(token)
      setUser(decode.username)
    }
    catch (error) {
      console.error(`Error token decode: ${error}`)
      localStorage.removeItem("logintoken")
      setUser(null)
    }
  }, [])

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 1024) {
  //       setCollapse(true)
  //       setScreenSize(window.innerWidth)
  //     }

  //     else if (window.innerWidth <= 768) {
  //       setScreenSize(window.innerWidth)
  //       setCollapse(true)
  //     }

  //     else {
  //       setScreenSize(window.innerWidth)
  //       setCollapse(false)
  //     }
  //   }

  //   handleResize()

  //   window.addEventListener("resize", handleResize)

  //   return () => window.removeEventListener("resize", handleResize)
  // }, [])

  const pages = [
    { page: "Dashboard", color: "blue", bg: "white", img: LayoutDashboard },
    { page: "Sales", color: "blue", bg: "white", img: ShoppingCart },
    {
      page: "Product",
      subpage: [{ id: "Product", label: "Product" },
      { id: "Add Product", label: "Add Product" }],
      color: "blue", bg: "white", img: Package
    },
    { page: "Revenue", color: "blue", bg: "white", img: BadgeIndianRupee },
    { page: "Analysis", color: "blue", bg: "white", img: ChartNoAxesCombined },
    { page: "Users", color: "blue", bg: "white", img: User },
    { page: "Orders", color: "blue", bg: "white", img: ShoppingBag },
  ]

  return (
    <>
      <div className={`navbar ${collapse ? "w-[100px] hidden" : "w-auto"} h-screen flex flex-col items-center gap-10 bg-[#111A2B] fixed `}>
        <div className="adminnav-header flex justify-between w-59 px-[5%] items-center">
          <img src={logo} alt="admin" className="admin_nav_logo rounded w-5" />
          <PanelLeftClose stroke='white' onClick={() => setCollapse(!collapse)} className={`cursor-pointer xl:hidden lg:block md:block sm:block`} />
        </div>
        <div className="navigation w-full h-full overflow-x-auto" style={{ scrollbarWidth: "none" }} >
          <div className="admin_nav_ul flex flex-col h-full space-between gap-5 px-2">
            {pages.map((item, idx) => (
              <div>
                <button key={idx}
                  //  className={`admin_nav_li bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 px-5 flex p-1 gap-5 cursor-pointer rounded-md text-lg`}
                  className={`admin_nav_li w-full cursor-pointer text-white px-5 flex p-1 gap-5  text-lg hover:bg-[#283249] rounded-md`}
                  onClick={() => {
                    (setCurrentPage(item.page),
                      subMenus && setSubmenus(false))
                    // screenSize <= 780 && (setCollapse(prev => !prev));
                    if (item.subpage) setSubmenus(!subMenus)
                  }}
                >
                  <item.img className={`${collapse ? "w-15 h-8" : "w-10 h-10"} items-center flex `} />
                  <p className={`${collapse ? "hidden" : "block"} font-medium self-center`}>{item.page}</p>
                  {item.subpage && (
                    <div className="self-center">
                      <ChevronDown />
                    </div>
                  )}

                </button>
                <div className="submenus">
                  {subMenus && item.subpage && (
                    <div>
                      {item.subpage.map((subitems, idx) => (
                        <button key={idx} className="w-full hover:bg-[#283249] text-white px-5 flex p-1 gap-5 cursor-pointer rounded-md text-lg justify-center " onClick={() => {
                          setCurrentPage(subitems.label);
                          // screenSize <= 780 && (setCollapse(prev => !prev));
                        }} >
                          {subitems.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* <div className="admin_name flex py-2 space-between gap-5">
              <div className="img-section w-10 h-5 flex items-center self-center">
                <img src="" alt="admin_img" className="w-fit h-8 rounded-3xl" />
              </div>
              <p className={`w-fit flex self-center text-black cursor-pointer `}>
                {user}
                <ChevronDown />
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
