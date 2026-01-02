import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import './Category.css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CartContext } from '../../componets/Context/Context_api';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [urlmssg, seturlMsg] = useState("")
    const [data, setData] = useState([])
    const { addedItems, addItem } = useContext(CartContext)
    const [imageView, setImageview] = useState(null)
    const [alertMsg, setAlertMsg] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        let urlmsg = new URLSearchParams(window.location.search)
        const catValue = urlmsg.get("cat");
        seturlMsg(catValue)
        console.log(`Message is: ${catValue}`)

        fetch(`${import.meta.env.VITE_BACKEND_API}categoryProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: catValue })
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

    return (
        <div>
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
                            {/* {imageView.map((img, index) => ( */}
                            <SwiperSlide className="swiper-slide">
                                <img src={`http://localhost:5000/uploads/${imageView}`} alt={imageView} />
                            </SwiperSlide>
                            {/* ))} */}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Category
