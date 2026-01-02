import React, { useContext, useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import { Smartphone, HomeIcon, Dumbbell, Sparkles, Headphones, Camera, Watch, Laptop, Search } from "lucide-react";
import 'react-multi-carousel/lib/styles.css';
import camera from '../images/camera.jpg'
import earbuds from '../images/earbuds.jpg'
import guitar from '../images/gitar.jpg'
import laptop_bag from '../images/laptop_bag.jpg'
import shoes from '../images/shoes.jpg'
import smart_tv from '../images/smart_tv.jpg'
import wirelessmouse from '../images/wirelessmouse.jpg'
import garage_tool from '../images/garage_tool.jpg'
import smartwatch from '../images/smartwatch.jpg'

import './home.css'
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../componets/Context/Context_api';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Alert from '../componets/Alert/Alert';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';
import Dealsection from './Dealsection/Dealsection';
import Footer from './Footer/Footer';

const Home = () => {
    const images = [
        camera,
        earbuds,
        guitar,
        laptop_bag,
        shoes,
        smart_tv,
        wirelessmouse,
        garage_tool
    ]

    const card_data = [
        // { id: 1, img: [car_img, car_img1], title: "Lamborgini super fast car and luxury", quantity: 1, price: 70000 },
        // { id: 2, img: [car_img1, car_img], title: "Buggati Chiron world fastest car", quantity: 1, price: 75000 },
        // { id: 3, img: car_img, title: "Lamborgini 7 series", quantity: 1, price: 11000 },
        // { id: 4, img: car_img, title: "Car images", quantity: 1, price: 10500 }
        {
            id: 1,
            img: [earbuds, earbuds],
            title: "Premium Wireless Earbuds Combo",
            desc: "A collection of high-end true wireless earbuds with sleek design, active noise cancellation, and all-day battery life — perfect for music, calls, and workouts.",
            quantity: 1,
            price: 179
        },
        {
            id: 2,
            img: shoes,
            title: "Performance Running Shoes",
            desc: "Lightweight and breathable running shoes engineered for comfort and speed. Features advanced cushioning and durable traction for every terrain.",
            quantity: 1,
            price: 129.99
        },
        {
            id: 3,
            img: smartwatch,
            title: "Modern Smartwatch with Fitness Tracking",
            desc: "Smartwatch featuring a vibrant display, fitness tracking, heart-rate monitor, and smartphone connectivity for calls, texts, and app notifications.",
            quantity: 1,
            price: 249
        },
        {
            id: 4,
            img: camera,
            title: "Canon DSLR Camera with Dual Lens Kit",
            desc: "Professional-grade DSLR camera offering crisp photo and video quality, interchangeable lenses, and advanced manual control settings for creative shooting.",
            quantity: 1,
            price: 1199
        },
        {
            id: 5,
            img: guitar,
            title: "Complete Electric Guitar Kit",
            desc: "High-quality electric guitar bundle that includes picks, a looper pedal, and tuning accessories — perfect for beginners and professionals alike.",
            quantity: 1,
            price: 699
        },
        {
            id: 6,
            img: laptop_bag,
            title: "Carbon Fiber Tech Backpack & Sling Bag",
            desc: "Durable carbon fiber hard-shell backpack set with a matching sling bag and mini travel case. Sleek, modern design ideal for tech lovers and travelers.",
            quantity: 1,
            price: 189
        },
        {
            id: 7,
            img: smart_tv,
            title: "50-inch 4K Smart TV with Streaming Apps",
            desc: "Ultra HD 4K Smart TV featuring integrated Wi-Fi and built-in streaming apps such as ESPN+, Netflix, and YouTube for an immersive entertainment experience.",
            quantity: 1,
            price: 499
        },
        {
            id: 8,
            img: [wirelessmouse, wirelessmouse],
            title: "Logitech G-Series Wireless Gaming Mouse",
            desc: "Ergonomic and lightweight wireless gaming mouse offering high precision, customizable DPI settings, and long-lasting battery life.",
            quantity: 1,
            price: 89.99
        },
        {
            id: 9,
            img: garage_tool,
            title: "Wall-Mounted Workshop Tool Kit",
            desc: "Comprehensive professional tool kit mounted on an organized wall board — includes drills, wrenches, pliers, hammers, and precision tools for all tasks.",
            quantity: 1,
            price: 549
        }
    ]

    const { addedItems, addItem } = useContext(CartContext)
    const [imageView, setImageview] = useState(null)
    const [alertMsg, setAlertMsg] = useState(null);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 1
            // items: 4
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 1,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    let imageViwer = (img) => {
        if (Array.isArray(img)) {
            setImageview(img);
        } else {
            setImageview([img]);
        }
    }

    const handleAdd = (item) => {
        addItem(item);
        setAlertMsg("Item added to cart!");
        setTimeout(() => {
            setAlertMsg("")
        }, 6000);
    };

    let navigate = useNavigate()

    const pageredirecter = (pagename) => {
        navigate(`/${pagename}`)
    }

    const API_BACKEND = import.meta.env.VITE_BACKEND_API;
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`${API_BACKEND}dataRetrive`)
            .then(res => res.json()
                .then(data => setItems(data))
                .catch(err => console.error(err))
            )
    }, [])

    const categories = [
        {
            icon: Smartphone,
            name: "Electronics",
            count: "2,450 items",
            color: { from: "#3b82f6", to: "#2563eb" }, // blue-500 → blue-600
            bgColor: "#eff6ff" // blue-50
        },
        {
            icon: Laptop,
            name: "Computers",
            count: "1,820 items",
            color: { from: "#6366f1", to: "#4f46e5" }, // indigo-500 → indigo-600
            bgColor: "#eef2ff" // indigo-50
        },
        {
            icon: Headphones,
            name: "Audio",
            count: "950 items",
            color: { from: "#a855f7", to: "#9333ea" }, // purple-500 → purple-600
            bgColor: "#faf5ff" // purple-50
        },
        {
            icon: Camera,
            name: "Cameras",
            count: "680 items",
            color: { from: "#ec4899", to: "#db2777" }, // pink-500 → pink-600
            bgColor: "#fdf2f8" // pink-50
        },
        {
            icon: Watch,
            name: "Wearables",
            count: "1,200 items",
            color: { from: "#ef4444", to: "#dc2626" }, // red-500 → red-600
            bgColor: "#fef2f2" // red-50
        },
        {
            icon: HomeIcon,
            name: "Home & Kitchen",
            count: "3,100 items",
            color: { from: "#22c55e", to: "#16a34a" }, // green-500 → green-600
            bgColor: "#f0fdf4" // green-50
        },
        {
            icon: Dumbbell,
            name: "Sports",
            count: "1,450 items",
            color: { from: "#f97316", to: "#ea580c" }, // orange-500 → orange-600
            bgColor: "#fff7ed" // orange-50
        },
        {
            icon: Sparkles,
            name: "Beauty",
            count: "2,050 items",
            color: { from: "#eab308", to: "#ca8a04" }, // yellow-500 → yellow-600
            bgColor: "#fefce8" // yellow-50
        },
    ];

    return (
        <>
            <div className="header_search_home">
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

            <div className="slider">
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: true
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={false}
                    modules={[Autoplay, Navigation, Pagination]}
                    className="swiper-container"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="home-carousel swiper-slide">
                            <img src={img} alt={img} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="card">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 1 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 3 }
                        }}
                        pagination={{ clickable: true }}
                        navigation={false}
                        modules={[Navigation]}
                        className="swiper-container"
                        style={{ width: "100%", padding: "10px 0" }}
                    >
                        {/* {card_data.map((data, index) => ( */}
                        {items.map((data, index) => (
                            <SwiperSlide key={index} className="swiper-slide">
                                <div className="cards cursor-pointer" key={index}
                                    onClick={() => navigate(`/Categorys?q=${data.category}`)}
                                >
                                    <div className="card_img">
                                        <img
                                            src={Array.isArray(data.file) ? (`${data.file}`) : (`${data.file}`)}
                                            className="swiper_slider_image"
                                        />
                                    </div>
                                    <div className="card_data">
                                        {data.productname}
                                        <div className="prices">
                                            <div className="price">
                                                ₹{data.productprice}
                                            </div>
                                            <div className="orignalprice">
                                                ₹30000
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addedItems.some((itemsbtn) => itemsbtn.productId === data.productId) ? pageredirecter("card") : handleAdd(data)}
                                            id="add_cart_btn">
                                            {addedItems.some((add_items) => add_items.productId === data.productId)
                                                ? "View Cart"
                                                : "Add In Cart"
                                            }
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {alertMsg && <Alert msg={alertMsg} />}

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
                                {imageView.map((img, index) => (
                                    <SwiperSlide key={index} className="swiper-slide">
                                        <img src={`http://localhost:5000/uploads/${img}`} alt={img} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>

            <div className="category_items">
                <div className="category_items_header">
                    <div>
                        <h2>Shop By Category</h2>
                        <p>Find exactly what you're looking for</p>
                    </div>

                    <Link to={"/"} >View All Categories</Link>
                </div>

                <div className="category_card">
                    {categories.map((item, index) => (
                        <div className="category_cards" key={index}>
                            <div className="icon_image" style={{
                                background: `linear-gradient(to right, ${item.color.from}, ${item.color.to})`,
                                backgroundColor: item.bgColor
                            }}>
                                <item.icon className="icon" stroke="white" />
                            </div>
                            <p className="item_name">{item.name}</p>
                            <p className="item_count">{item.count}</p>
                        </div>
                    ))}
                </div>
            </div>

            <FeaturedProduct />

            <Dealsection />

            <Footer />
        </>
    )
}

export default Home
