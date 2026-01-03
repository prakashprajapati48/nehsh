import { createContext, useState } from 'react';

export const CartContext = createContext()

export const Cartprovider = ({ children }) => {

    const [addedItems, setAddedItems] = useState([]);
    const [tempData, setTempdata] = useState("")
    const [wishList, setWishlist] = useState([]);

    const addItem = (item) => {
        let exist = addedItems.some(addit => addit.productid === item.productid)
        if (!exist) {
            setAddedItems((prev) => [...prev, item]);
        }
    };

    const removeItem = (id) => {
        setAddedItems((prev) => prev.filter((item) => item.productid !== id));
    };

    const wishlists = (items) => {
        let exist = wishList.some(check => check.productid === items.productid);

        if (!exist) {
            setWishlist((prev) => [...prev, items]);
        }
    }

    const wishlistRemove = (itemId) => {
        setWishlist((prev) => prev.filter((item) => item.productid !== itemId))
    }

    return (
        <CartContext.Provider value={{ addedItems, addItem, removeItem, setAddedItems, wishList, wishlists, setWishlist, wishlistRemove }}>
            {children}
        </CartContext.Provider>
    )
}
