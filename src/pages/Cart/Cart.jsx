import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCartApi,
    updateCartItemApi,
    deleteCartItemApi,
    clearCartApi,
} from "./api/cart";

function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const phoneNumber = "917799296786";

    // FETCH CART
    const fetchCart = async () => {

        try {

            const response = await getCartApi();

            setCartItems(response?.data?.items || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();

    }, []);

    // UPDATE QUANTITY
    const updateQuantity = async (id, quantity) => {

        if (quantity < 1) return;

        try {

            await updateCartItemApi(id, quantity);

            fetchCart();

        } catch (error) {

            console.log(error);
        }
    };

    // REMOVE ITEM
    const removeItem = async (id) => {

        try {

            await deleteCartItemApi(id);

            fetchCart();

        } catch (error) {

            console.log(error);
        }
    };

    // CLEAR CART
    const clearCart = async () => {

        try {

            await clearCartApi();

            fetchCart();

        } catch (error) {

            console.log(error);
        }
    };

    // GRAND TOTAL
    const grandTotal = cartItems.reduce(
        (acc, item) => acc + item.total,
        0
    );

    // WHATSAPP MESSAGE
    const getWhatsAppCartLink = () => {

        if (cartItems.length === 0) return "#";

        let message = `Hi Sana Sarees 👋

I want to order these products:

`;

        cartItems.forEach((item, index) => {

            message += `
${index + 1}. ${item.product.name}

Price: ₹${item.product.price}
Quantity: ${item.quantity}
Total: ₹${item.total}

Product Image:
${item.product.image_url}

View Product:
${window.location.origin}/products/${item.product.id}

`;
        });

        message += `
Grand Total: ₹${grandTotal}

Please share delivery details.
`;

        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    if (loading) {

        return (
            <div className="pt-32 text-center">
                Loading cart...
            </div>
        );
    }
return (
  <div className="bg-[#f5f5f6] min-h-screen pt-28 pb-16">

    <div className="max-w-7xl mx-auto px-4">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-[#282c3f]">
            Shopping Bag
          </h1>

          <p className="text-gray-500 mt-1">
            {cartItems.length} Items in your cart
          </p>

        </div>

        {cartItems.length > 0 && (

          <button
            onClick={clearCart}
            className="text-red-500 border border-red-200 hover:bg-red-50 px-5 py-2 rounded-xl font-medium transition"
          >
            Clear Cart
          </button>

        )}

      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (

        <div className="bg-white rounded-3xl p-16 text-center shadow-sm">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="empty cart"
            className="w-32 mx-auto mb-6 opacity-80"
          />

          <h2 className="text-3xl font-bold text-[#282c3f] mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-8">
            Add beautiful sarees to continue shopping
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-[#7A1E2D] hover:bg-[#5e1622] text-white px-8 py-4 rounded-2xl font-medium transition"
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-5">

            {/* OFFER STRIP */}
            <div className="bg-[#fff7e6] border border-[#f5d28c] rounded-2xl px-5 py-4 flex items-center justify-between">

              <div>

                <p className="font-semibold text-[#7A1E2D]">
                  🎉 Special Offer Applied
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  You're getting premium saree discounts
                </p>

              </div>

              <span className="text-[#ff905a] font-bold text-lg">
                SAVE MORE
              </span>

            </div>

            {/* CART ITEMS */}
            {cartItems.map((item) => {

              const savings =
                (item.product.original_price || 0) -
                item.product.price;

              return (

                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                >

                  <div className="flex flex-col md:flex-row gap-5">

                    {/* IMAGE */}
                    <div className="relative">

                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full md:w-[180px] h-[240px] object-cover rounded-2xl"
                      />

                      {item.product.discount && (

                        <div className="absolute top-3 left-3 bg-[#ff3f6c] text-white text-xs font-bold px-3 py-1 rounded-full">
                          {item.product.discount}% OFF
                        </div>

                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 flex flex-col justify-between">

                      <div>

                        <h2 className="text-2xl font-semibold text-[#282c3f]">
                          {item.product.name}
                        </h2>

                        <p className="text-gray-500 mt-1">
                          {item.product.fabric} • {item.product.occasion}
                        </p>

                        {/* PRICE */}
                        <div className="flex items-center gap-3 mt-4">

                          <span className="text-2xl font-bold text-[#282c3f]">
                            ₹{item.product.price}
                          </span>

                          <span className="line-through text-gray-400">
                            ₹{item.product.original_price}
                          </span>

                          <span className="text-[#03a685] font-semibold">
                            Save ₹{savings}
                          </span>

                        </div>

                        {/* QUANTITY */}
                        <div className="mt-6 flex items-center gap-4">

                          <span className="text-sm font-medium text-gray-500">
                            Quantity
                          </span>

                          <div className="flex items-center border rounded-xl overflow-hidden">

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-10 h-10 hover:bg-gray-100 transition"
                            >
                              -
                            </button>

                            <div className="w-12 text-center font-semibold">
                              {item.quantity}
                            </div>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-10 h-10 hover:bg-gray-100 transition"
                            >
                              +
                            </button>

                          </div>

                        </div>

                      </div>

                      {/* BOTTOM */}
                      <div className="flex items-center justify-between mt-6">

                        <div>

                          <p className="text-sm text-gray-500">
                            Total Amount
                          </p>

                          <p className="text-2xl font-bold text-[#7A1E2D]">
                            ₹{item.total}
                          </p>

                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition font-medium"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

          {/* RIGHT SIDE */}
          <div className="sticky top-28">

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">

              <h2 className="text-2xl font-bold text-[#282c3f] mb-6">
                Price Details
              </h2>

              {/* SUMMARY */}
              <div className="space-y-4 border-b pb-5">

                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold text-[#282c3f]">
                  <span>Total Amount</span>
                  <span>₹{grandTotal}</span>
                </div>

              </div>

              {/* SAFE STRIP */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-5">

                <p className="text-green-700 font-medium text-sm">
                  ✔ Secure ordering via WhatsApp
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Direct confirmation from Sana Sarees
                </p>

              </div>

              {/* BUTTONS */}
              <div className="mt-6 space-y-3">

                {/* ADD MORE */}
                <button
                  onClick={() => navigate("/products")}
                  className="w-full border-2 border-[#7A1E2D] text-[#7A1E2D] hover:bg-[#7A1E2D] hover:text-white transition py-4 rounded-2xl font-semibold"
                >
                  Add More Items
                </button>

                {/* WHATSAPP */}
                <a
                  href={getWhatsAppCartLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#03a685] hover:bg-[#02856b] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg shadow-lg transition"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-6 h-6 fill-white"
                  >
                    <path d="M16.001 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.352.613 4.566 1.68 6.5L2.667 29.333l6.933-1.653A13.25 13.25 0 0016 29.333c7.36 0 13.333-5.973 13.333-13.333S23.36 2.667 16.001 2.667z" />
                  </svg>

                  Order via WhatsApp

                </a>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  </div>
);

}

export default Cart;
