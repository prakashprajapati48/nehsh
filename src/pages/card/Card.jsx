import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../componets/Context/Context_api";
import './Card.css'
import remove_icon from '../../assets/icon/remove_icon.png'
import { Link } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";

export default function Cart() {
    const { addedItems, removeItem, setAddedItems } = useContext(CartContext);
    const [valuepri, setVal] = useState([])
    const [totalprice, setTotalprice] = useState()

    const removeitem = (id) => {
        removeItem(id);
    }

    useEffect(() => {
        const newTotals = addedItems.map(item => item.productPrice * item.quantity)
        setVal(newTotals)
        const grandTotal = newTotals.reduce((acc, cur) => acc + cur, 0)
        setTotalprice(grandTotal)
    }, [addedItems])


    const add = (id) => {
        setAddedItems(addedItems.map(item =>
            item.productId === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const subt = (id) => {
        setAddedItems(addedItems.map(item => item.productId === id ?
            { ...item, quantity: item.quantity === 1 ? 1 : item.quantity - 1 } : item))
    }

    return (
        <>
            {addedItems.length === 0 ? (<>
                <div className="cart_redirect align-center">
                    <div className="emptyCartIcon">
                        <ShoppingCart className="emptyCart" />
                        <X className="emptyIcon" />
                    </div>
                    <p>Your cart is empty</p>
                    <Link to={"/"}>
                        <button>Continue Shopping</button>
                    </Link>
                </div>
            </>) : (
                <div className="cart" >
                    <h2>Your Cart</h2>
                    <div className="cartData">
                        {/* <ul className="cart-header" >
                            <li>Item</li>
                            <li>Quantity</li>
                            <li>Total</li>
                        </ul> */}
                        <div className="cart_items">
                            {
                                addedItems.map((item, index) => (
                                    <div key={index} className="card_add_data" >
                                        {/* <img src={Array.isArray(item.img) ? item.file : item.img} alt={item.productName} className="add_card_img" /> */}
                                        <div className="add_item_details">
                                            <img src={item.file?.includes("http") ? item.file : `http://localhost:5000/uploads/${item.file}`} alt={item.productName} className="add_card_img" />
                                            <div className="cartItemdetail">
                                                <p className="add_card_title" >{item.productName}</p>
                                                <p className="item_price" >₹{item.productPrice}</p>
                                                <p className="removep" onClick={() => removeitem(item.productId)}>Remove</p>
                                            </div>
                                        </div>
                                        {/* <p className="item_price" >{item.price * item.quantity}</p> */}
                                        <div className="quantity">
                                            <button className="add_btn" onClick={() => add(item.productId)} >+</button>
                                            <p>{item.quantity}</p>
                                            <button className="remove_btn" onClick={() => subt(item.productId)} >-</button>
                                        </div>
                                        <div className="total_final">
                                            <p className="item_price" >₹{parseFloat(item.productPrice * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="orderSummary">
                            <h2>Order Summary</h2>
                            <div className="subtotal" >
                                <div className="finalprice">
                                    <p>Subtotal: <span>₹{parseFloat(totalprice).toFixed(2)}</span> </p>
                                    {/* <p>Sales Tax: <span>₹{parseFloat(totalprice * 10 / 100).toFixed(2)}</span></p> */}
                                    <p>Shipping: <span>Free</span></p>
                                    <p>Total: <span>₹{totalprice}</span></p>
                                    {/* <p>Total: <span>₹{parseFloat(totalprice + totalprice * 10 / 100).toFixed(2)}</span></p> */}
                                </div>
                            </div>
                            <button className="checkoutBtn"><Link to={"/Checkout"} state={{ price: totalprice }} >Proceed to Checkout</Link></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
