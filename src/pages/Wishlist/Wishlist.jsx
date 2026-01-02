import React, { useContext, useEffect, useState } from 'react'
import './Wishlist.css';
import { CartContext } from '../../componets/Context/Context_api'
import { EllipsisVertical, Heart, HeartCrack, ShoppingBagIcon, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishList, wishlists, wishlistRemove } = useContext(CartContext);
  const [pageSize, setPagesize] = useState(window.innerWidth);
  const [iconrmShow, setIconrmshow] = useState(null)

  useEffect(() => {
    let resize = () => setPagesize(window.innerWidth);

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <>
      <div className="wishList">
        {wishList.length !== 0 ? (
          pageSize >= 480 ?
            (
              <table className="wishlist_table">
                <thead className="wishlist_head">
                  <tr>
                    <td>Img</td>
                    <td>Name</td>
                    <td>Stock</td>
                    <td>Price</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody className="wishlist_body">
                  {wishList.map((item, idx) => (
                    <tr key={idx}>
                      <td><img src={item.file} alt="" className="wishlist_img" /></td>
                      <td className="wishlistItemname">{item.productName}</td>
                      <td className="wishlistItemstock">In Stock</td>
                      <td>₹{item.productPrice} <span style={{ textDecoration: "line-through" }}>₹{item.originalPrice}</span></td>
                      <td>
                        <button>Add To Cart</button>
                      </td>
                      <td onClick={() => wishlistRemove(item.productId)} className="wishlist_remove"><X /> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <h2 className="wishlist_header">Wishlist</h2>
                {wishList.map((item, idx) => (
                  <div className="wishlist_mb" key={idx}>
                    <div key={idx} className="wishlistItemImg">
                      <img src={item.file} alt="" className="wishlist_img" />
                      <span className="removebtn" onClick={() => setIconrmshow(iconrmShow === item.productId ? null : item.productId)}><EllipsisVertical fill='black' /> </span>
                      <span className={`removeitem ${iconrmShow === item.productId ? "removeitemshow" : "removeitemhide"}`} onClick={() => wishlistRemove(item.productId)} key={idx}>Remove</span>
                    </div>
                    <div className="wishlist_details">
                      <p className="wishlistItemname">{item.productName}</p>
                      <p className="wishlistprice">₹{item.productPrice} {item.originalPrice !== null ? <span style={{ textDecoration: "line-through" }}>₹{item.originalPrice}</span> : ""}</p>
                      <p className="wishlistReviews"><span><Star fill='yellow' stroke='yellow' /> </span>{item.rating}</p>
                      <p className="wishlistItemstock">In Stock</p>
                      <button>Add To Cart</button>
                    </div>
                  </div>
                ))}
              </>
            )
        ) : (
          <div className="wishlistEmpty">
            <div className="wishlistEmtIcon">
              <ShoppingBagIcon className="wishlistBagIcon" />
              {/* <Heart className="wishlistIconhrt" stroke='grey' fill='grey'/> */}
            </div>
            <p>Empty Wishlist</p>
            <Link to={"/"}>
              <button>Continue Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Wishlist
