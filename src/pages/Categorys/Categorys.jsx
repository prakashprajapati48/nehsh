import React, { useContext, useEffect, useState } from 'react'
import './Categorys.css'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { CartContext } from '../../componets/Context/Context_api'
import sppiner from '../../images/spinner.gif';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

const Categorys = () => {
    // let location = useLocation()
    // let { category } = location.state;
    let param = new URLSearchParams(window.location.search)
    let category = param.get("q")

    const [data, setData] = useState([])
    const { addedItems, addItem } = useContext(CartContext)
    const [imageView, setImageview] = useState(null)
    const [alertMsg, setAlertMsg] = useState(null);
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState({ brand: "", price: "" });
    const [menuShow, setMenuShow] = useState({ filterShow: false, brand: false, price: false })

    useEffect(() => {

        fetch(`${import.meta.env.VITE_BACKEND_API}categoryProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: category })
        })
            .then(data => data.json()
                .then(sqlData => setData(sqlData))
                .catch(err => console.error(err)))
    }, [])

    const pageredirecter = (pagename) => {
        navigate(`/${pagename}`)
    }

    const handleAdd = (item) => {
        addItem(item);
        setAlertMsg("Item added to cart!");
        setTimeout(() => {
            setAlertMsg("")
        }, 6000);
    };

    const filterData = [{ brand: ["Apple", "Samsung", "Nokia", "OnePlus", "Redmi", "Realme"], price: [500, 1000, 1500, 2000] }];

    return (
        <>
            {/* <div>
                <div className="card_header">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            0: { slidesPerView: 3 },
                            480: { slidesPerView: 3 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 }
                        }}
                        pagination={{ clickable: true }}
                        navigation={false}
                        modules={[Navigation]}
                        className="swiper-container"
                        style={{ width: "100%", padding: "10px 0" }}
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index} className="swiper-slide">
                                <div className="cards cursor-pointer" key={index}>
                                    <div className="card_img">
                                        <img
                                            // src={Array.isArray(item.file) ? (`http://localhost:5000/uploads/${item.file[0]}`) : (`http://localhost:5000/uploads/${data.file}`)}
                                            src={`http://localhost:5000/uploads/${item.file}`} onClick={() => setImageview(item.file)}
                                        />
                                    </div>
                                    <div className="card_data">
                                        {item.productName}
                                        <div className="price">
                                            ₹{item.productPrice}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addedItems.some((itemsbtn) => itemsbtn.productId === item.productId) ? pageredirecter("cart") : handleAdd(item)}
                                        id="add_cart_btn">
                                        {addedItems.some((add_items) => add_items.productId === item.productId)
                                            ? "View Cart"
                                            : "Add In Cart"
                                        }
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="image_viwer">
                    {imageView && (
                        <div className="img_overlay" id="img_overlay" onClick={() => setImageview("")} >
                            <Swiper
                                effect="coverflow"
                                grabCursor={true}
                                centeredSlides={true}
                                lazy={true}
                                slidesPerView="auto"
                                coverflowEffect={{
                                    rotate: 30,
                                    stretch: 0,
                                    depth: 200,
                                    modifier: 1,
                                    slideShadows: true
                                }}
                                pagination={{ clickable: true }}
                                navigation={false}
                                modules={[Navigation, Pagination]}
                                className="swiper-container"
                            >
                                <SwiperSlide className="swiper-slide">
                                    <img src={`http://localhost:5000/uploads/${imageView}`} alt={imageView} />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    )}
                </div>
            </div> */}

            {data.length > 0 ? (
                <div className="categoryData">
                    <div className="filterIcon" onClick={() => setMenuShow(prev => ({ ...prev, filterShow: !menuShow.filterShow }))}>
                        <SlidersHorizontal fill='black' stroke='black' width={35} />
                    </div>
                    <div className={`categoryFilter ${menuShow.filterShow ? "filterShow" : "filterHide"}`}>
                        <h2 className="filterHead">Filters</h2>
                        <>
                            <div className="filter FilterBrandH" onClick={() => setMenuShow(prev => ({ ...prev, brand: !menuShow.brand }))}>
                                <div className="submenuOption">BRAND</div>
                                <ChevronDown />
                            </div>
                            {menuShow.brand && (<>
                                {filterData[0].brand.map((filterData, idx) => (
                                    <div className="brands filterItems" key={idx}>
                                        <input type="checkbox" id={`brand-${filterData}`} key={idx} value={filterData} checked={filterValues.brand.includes(filterData)} onChange={(e) => {
                                            const { checked, value } = e.target; setFilterValues(prev => ({ ...prev, brand: checked ? [...prev.brand, value] : prev.brand.filter(b => b !== filterData) }))
                                        }} />
                                        <label htmlFor={`brand-${filterData}`}>{filterData}</label>
                                    </div>
                                ))}
                            </>)}

                            <div className="filter FilterPrice" onClick={() => setMenuShow(prev => ({ ...prev, price: !menuShow.price }))}>
                                <div className="submenuOption">Price</div>
                                <ChevronDown />
                            </div>

                            {menuShow.price && (<>
                                <div className="filterpice">
                                    {filterData[0].price.map((prices, idx) => (
                                        <div className={`price-${prices} filterItems`} key={`${idx}`}>
                                            <input key={idx} type="checkbox" id="price" value={prices}
                                                checked={filterValues.price.includes(prices)}
                                                onChange={(e) => {
                                                    const { checked, value } = e.target;
                                                    const numericPrice = Number(value);
                                                    setFilterValues(prev => ({ ...prev, price: checked ? [...prev.price, numericPrice] : prev.price.filter(b => b !== numericPrice) }))
                                                }} />
                                            <label htmlFor={prices}>{prices}</label>
                                        </div>
                                    ))}
                                </div>
                            </>)}

                            <button className="filterBtn">Apply</button>
                        </>

                    </div>
                    <div className="category">
                        {data.map((items, idx) => (
                            <div className="categoryItems" key={idx}>
                                <div className="categoryImg">
                                    <img src={Array.isArray(items.file) ? `http://localhost:5000/uploads/${items.file[0]}` : `http://localhost:5000/uploads/${items.file}`} alt="" />
                                </div>
                                <div className="itemDetails">
                                    <p className="itemName">{items.productName}</p>
                                    {/* <p className="itemDesc">{items.productDesc}</p> */}
                                    <p className="itemPrice">₹{items.productPrice}</p>
                                    <button
                                        onClick={() => addedItems.some((itemsbtn) => itemsbtn.productId === items.productId) ? pageredirecter("cart") : handleAdd(items)}
                                        id="add_cart_btn">
                                        {addedItems.some((add_items) => add_items.productId === items.productId)
                                            ? "View Cart"
                                            : "Add In Cart"
                                        }
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="spinner">
                    <img src={sppiner} />
                </div>
            )}
        </>
    )
}

export default Categorys
