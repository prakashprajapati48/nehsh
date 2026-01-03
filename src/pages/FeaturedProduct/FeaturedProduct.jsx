import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './FeaturedProduct.css'
import { Heart, ShoppingCart, Star } from "lucide-react";
import { CartContext } from '../../componets/Context/Context_api';

const FeaturedProduct = () => {

    // const [filColor, setFilcolor] = useState([])
    const { wishList, wishlists, setWishlist, wishlistRemove } = useContext(CartContext);
    const { addedItems, addItem } = useContext(CartContext);
    const [alertMsg, setAlertMsg] = useState(null);
    const navigate = useNavigate();

    // const products = [
    //     {
    //         id: 1,
    //         name: "Premium Wireless Headphones",
    //         price: 299.99,
    //         originalPrice: 399.99,
    //         rating: 4.8,
    //         reviews: 324,
    //         image: "https://images.unsplash.com/photo-1578517581165-61ec5ab27a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc2NDc1NTEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "Best Seller",
    //         badgeColor: "#3b82f6" // blue-500
    //     },
    //     {
    //         id: 2,
    //         name: "Smart Watch Pro",
    //         price: 449.99,
    //         originalPrice: null,
    //         rating: 4.9,
    //         reviews: 512,
    //         image: "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwbW9kZXJufGVufDF8fHx8MTc2NDgwMDA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "New",
    //         badgeColor: "#22c55e" // green-500
    //     },
    //     {
    //         id: 3,
    //         name: "Professional Camera Kit",
    //         price: 1299.99,
    //         originalPrice: 1499.99,
    //         rating: 4.7,
    //         reviews: 189,
    //         image: "https://images.unsplash.com/photo-1597865927834-dfa12950143c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjQ3MzU1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "Hot",
    //         badgeColor: "#ef4444" // red-500
    //     },
    //     {
    //         id: 4,
    //         name: "Minimalist Table Lamp",
    //         price: 89.99,
    //         originalPrice: 129.99,
    //         rating: 4.6,
    //         reviews: 276,
    //         image: "https://images.unsplash.com/photo-1617325279446-f0831b1d369d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NDgyMzYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "Sale",
    //         badgeColor: "#f97316" // orange-500
    //     },
    //     {
    //         id: 5,
    //         name: "Portable Bluetooth Speaker",
    //         price: 129.99,
    //         originalPrice: null,
    //         rating: 4.8,
    //         reviews: 423,
    //         image: "https://images.unsplash.com/photo-1674303324806-7018a739ed11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNwZWFrZXIlMjBibHVldG9vdGh8ZW58MXx8fHwxNzY0ODAxMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "Best Seller",
    //         badgeColor: "#3b82f6" // blue-500
    //     },
    //     {
    //         id: 6,
    //         name: "Fitness Tracker Band",
    //         price: 79.99,
    //         originalPrice: 99.99,
    //         rating: 4.5,
    //         reviews: 298,
    //         image: "https://images.unsplash.com/photo-1760031670160-4da44e9596d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwbW9kZXJufGVufDF8fHx8MTc2NDgyMzYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "Sale",
    //         badgeColor: "#f97316" // orange-500
    //     },
    //     {
    //         id: 7,
    //         name: "Ultra-Slim Laptop",
    //         price: 1899.99,
    //         originalPrice: null,
    //         rating: 4.9,
    //         reviews: 678,
    //         image: "https://images.unsplash.com/photo-1677157561132-4f9e282a1684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQ3NDE0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "New",
    //         badgeColor: "#22c55e" // green-500
    //     },
    //     {
    //         id: 8,
    //         name: "Smart Home Hub",
    //         price: 199.99,
    //         originalPrice: 249.99,
    //         rating: 4.7,
    //         reviews: 345,
    //         image: "https://images.unsplash.com/photo-1595234235838-2fc8984bc651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwZ2FkZ2V0cyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQ4MjM2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //         badge: "Hot",
    //         badgeColor: "#ef4444" // red-500
    //     }
    // ];

    const products = [
        {
            productid: 1,
            productname: "Premium Wireless Headphones",
            productprice: 299.99,
            originalPrice: 399.99,
            quantity: 1,
            rating: 4.8,
            reviews: 324,
            file: "https://images.unsplash.com/photo-1578517581165-61ec5ab27a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc2NDc1NTEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "Best Seller",
            badgeColor: "#3b82f6"
        },
        {
            productid: 2,
            productname: "Smart Watch Pro",
            productprice: 449.99,
            originalPrice: null,
            quantity: 1,
            rating: 4.9,
            reviews: 512,
            file: "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwbW9kZXJufGVufDF8fHx8MTc2NDgwMDA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "New",
            badgeColor: "#22c55e"
        },
        {
            productid: 3,
            productname: "Professional Camera Kit",
            productprice: 1299.99,
            originalPrice: 1499.99,
            quantity: 1,
            rating: 4.7,
            reviews: 189,
            file: "https://images.unsplash.com/photo-1597865927834-dfa12950143c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NjQ3MzU1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "Hot",
            badgeColor: "#ef4444"
        },
        {
            productid: 4,
            productname: "Minimalist Table Lamp",
            productprice: 89.99,
            originalPrice: 129.99,
            quantity: 1,
            rating: 4.6,
            reviews: 276,
            file: "https://images.unsplash.com/photo-1617325279446-f0831b1d369d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NDgyMzYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "Sale",
            badgeColor: "#f97316"
        },
        {
            productid: 5,
            productname: "Portable Bluetooth Speaker",
            productprice: 129.99,
            originalPrice: null,
            quantity: 1,
            rating: 4.8,
            reviews: 423,
            file: "https://images.unsplash.com/photo-1674303324806-7018a739ed11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMHNwZWFrZXIlMjBibHVldG9vdGh8ZW58MXx8fHwxNzY0ODAxMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "Best Seller",
            badgeColor: "#3b82f6"
        },
        {
            productid: 6,
            productname: "Fitness Tracker Band",
            productprice: 79.99,
            originalPrice: 99.99,
            quantity: 1,
            rating: 4.5,
            reviews: 298,
            file: "https://images.unsplash.com/photo-1760031670160-4da44e9596d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXF1aXBtZW50JTIwbW9kZXJufGVufDF8fHx8MTc2NDgyMzYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "Sale",
            badgeColor: "#f97316"
        },
        {
            productid: 7,
            productname: "Ultra-Slim Laptop",
            productprice: 1899.99,
            originalPrice: null,
            quantity: 1,
            rating: 4.9,
            reviews: 678,
            file: "https://images.unsplash.com/photo-1677157561132-4f9e282a1684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQ3NDE0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "New",
            badgeColor: "#22c55e"
        },
        {
            productid: 8,
            productname: "Smart Home Hub",
            productprice: 199.99,
            originalPrice: 249.99,
            quantity: 1,
            rating: 4.7,
            reviews: 345,
            file: "https://images.unsplash.com/photo-1595234235838-2fc8984bc651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwZ2FkZ2V0cyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQ4MjM2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
            badge: "Hot",
            badgeColor: "#ef4444"
        }
    ];

    const addWishlist = (item) => {
        wishlists(item)
    }

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

    // const wishlist_color = (id) => {
    //     setFilcolor((prev) => prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id])
    // }

    return (
        <>
            <div className="featured_product">
                <div className="product_header">
                    <div className="header">
                        <h2 className="product_header_title">Featured Products</h2>
                        <p className="product_header_para">Handpicked favorites for you</p>
                    </div>

                    <button className="product_viwer_btn">
                        <Link to={"/"}>View All</Link>
                    </button>
                </div>

                <div className="featured_item_card">
                    {products.map((item, index) => (
                        <div className="items_details" key={index}>
                            <span className="wishlist" onClick={() => { wishList.some(itemadd => itemadd.productid === item.productid) ? wishlistRemove(item.productid) : addWishlist(item) }}>
                                <Heart
                                    fill={wishList.some(wishitem => wishitem.productid === item.productid) ? "#FB2D36" : "white"}
                                    stroke={wishList.some(wishitem => wishitem.productid === item.productid) ? "#FB2D36" : "black"}
                                    strokeWidth={1.5} />
                            </span>

                            <div className="image_container">
                                <img src={item.file} alt={item.productname} className="item_image" />

                                <div className="add_cart_btn">
                                    <button onClick={() => addedItems.some((itemsbtn) => itemsbtn.productid === item.productid) ? pageredirecter("cart") : handleAdd(item)}>
                                        <ShoppingCart className="shopping_cart_icon" width={20} height={20} /> {addedItems.some((add_items) => add_items.productid === item.productid)
                                            ? "View Cart"
                                            : "Add In Cart"
                                        }
                                    </button>
                                </div>

                                <span className="item_badge" style={{ backgroundColor: item.badgeColor }}>{item.badge}</span>
                            </div>

                            <div className="details">
                                <p className="item_name">{item.productname}</p>
                                <span className="rate_review">
                                    <Star fill="yellow" stroke="yellow" />
                                    <p className="rating">{item.rating}</p>
                                    <p className="review">({item.reviews})</p>
                                </span>
                                <span className="items_price">
                                    <p className="item_price">₹{item.productprice}</p>
                                    <p className="originalprice">{item.originalPrice !== null ? "₹" + item.originalPrice : ""}</p>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FeaturedProduct
