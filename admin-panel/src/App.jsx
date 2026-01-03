import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Login from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import Analysis from './Component/Dashboard/Analysis';
import Signup from './Component/Signup/Signup';
import { jwtDecode } from 'jwt-decode';
import Header from './Component/header/Header';
import Orders from './Component/Dashboard/Orders';
import Users from './Component/Dashboard/Users';
import AddProduct from './Component/Dashboard/AddProduct';
import Products from './Component/Dashboard/Products';
import Revenue from './Component/Dashboard/Revenue';

function App() {
  const [username, setUsername] = useState("")
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [pagechanger, setPageChanger] = useState("")
  const [collapse, setCollapse] = useState(false)
  const [authLogin, setAuthLogin] = useState(false)

  const effectRan = useRef(false);

  useLayoutEffect(() => {
    const update = () => setCollapse(window.innerWidth <= 1024);

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useLayoutEffect(() => {
    let token = localStorage.getItem("logintoken")
    if (!token) {
      setAuthLogin(false);
      return;
    }

    try {
      let decode = jwtDecode(token)
      setUsername(decode.username)
      setAuthLogin(true)
    }

    catch (err) {
      setAuthLogin(false)
      console.error(`Error: ${err}`)
    }
  }, [])

const pagesname = [
  {
    pagenames: "Dashboard",
    pageloaction: <Dashboard collapse={collapse} setCollapse={setCollapse} />
  },
  {
    pagenames: "Sales",
    pageloaction: <Dashboard />
  },
  {
    pagenames: "CRM",
    pageloaction: <Dashboard />
  },
  {
    pagenames: "Analysis",
    pageloaction: <Analysis collapse={collapse} setCollapse={setCollapse} />
  },
  {
    pagenames: "Users",
    pageloaction: <Users />
  },
  {
    pagenames: "Orders",
    pageloaction: <Orders collapse={collapse} setCollapse={setCollapse} />
  },
  {
    pagenames: "Product",
    pageloaction: <Products setCurrentPage={setCurrentPage} currentPage={currentPage} collapse={collapse} setCollapse={setCollapse} />
  },
  {
    pagenames: "Add Product",
    pageloaction: <AddProduct collapse={collapse} setCollapse={setCollapse} />
  },
  {
    pagenames: "Revenue",
    pageloaction: <Revenue collapse={collapse} setCollapse={setCollapse} />
  }
]

useEffect(() => {
  pagesname.toLocaleString().toLowerCase();

  let finded = pagesname.find(
    (page) => page.pagenames.toLowerCase() === currentPage.toLowerCase()
  );

  if (finded) {
    setPageChanger(finded.pageloaction);
  } else {
    setPageChanger("No found");
  }
}, [currentPage, collapse]);

return (
  <>
    <Router>
      {!authLogin ? (
        <div className="flex h-auto max-sm:w-full overflow-x-hidden ">
          <div className={`${collapse ? "w-[100px] hidden" : "w-fit absolute z-10"} border-r h-full`}>
            <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} collapse={collapse} setCollapse={setCollapse} />
          </div>
          <div className={`flex flex-col flex-1 w-full h-full  ${!collapse ? "md:pl-[24%] lg:pl-[15%]" : "px-4 sm:pl-3 md:pl-4 lg:pl-5"}`}>
            <Header collapse={collapse} setCollapse={setCollapse} />
            <div className={`flex-1 overflow-x-auto w-full pt-7 pb-5 ${collapse ? "self-center" : "px-[0%] lg:px-[1.2%] xl:px-[1.2%]"}`} style={{ scrollbarWidth: "none" }}>
              <Routes>
                <Route path='/' element={pagechanger} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )
      }
    </Router>
  </>
)
}

export default App
