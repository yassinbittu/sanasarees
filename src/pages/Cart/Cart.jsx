import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../../utils/cart";

function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const phoneNumber = "917799296786";

  // FETCH CART
  const fetchCart = () => {

    const cart = getCart();

    setCartItems(cart);

    setLoading(false);
  };

  useEffect(() => {

    fetchCart();

  }, []);

  // UPDATE QUANTITY
  const updateQuantity = (id, quantity) => {

    if (quantity < 1) return;

    updateCartQuantity(id, quantity);

    fetchCart();

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // REMOVE ITEM
  const removeItem = (id) => {

    removeFromCart(id);

    fetchCart();

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // CLEAR CART
  const handleClearCart = () => {

    clearCart();

    fetchCart();

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // GRAND TOTAL
  const grandTotal = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
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
${index + 1}. ${item.name}

Price: ₹${item.price}
Quantity: ${item.quantity}
Total: ₹${item.price * item.quantity}

View Product:
${window.location.origin}/products/${item.id}

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
              onClick={handleClearCart}
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

              {cartItems.map((item) => {

                const savings =
                  (item.original_price || item.price) - item.price;

                return (

                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                  >

                    <div className="flex flex-col md:flex-row gap-5">

                      {/* IMAGE */}
                      <div className="relative">

                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full md:w-[180px] h-[240px] object-cover rounded-2xl"
                        />

                        {item.discount && (

                          <div className="absolute top-3 left-3 bg-[#ff3f6c] text-white text-xs font-bold px-3 py-1 rounded-full">
                            {item.discount}% OFF
                          </div>

                        )}

                      </div>

                      {/* DETAILS */}
                      <div className="flex-1 flex flex-col justify-between">

                        <div>

                          <h2 className="text-2xl font-semibold text-[#282c3f]">
                            {item.name}
                          </h2>

                          <p className="text-gray-500 mt-1">
                            {item.fabric} • {item.occasion}
                          </p>

                          {/* PRICE */}
                          <div className="flex items-center gap-3 mt-4">

                            <span className="text-2xl font-bold text-[#282c3f]">
                              ₹{item.price}
                            </span>

                            {item.original_price && (

                              <span className="line-through text-gray-400">
                                ₹{item.original_price}
                              </span>

                            )}

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
                              ₹{item.price * item.quantity}
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

                <div className="mt-6 space-y-3">

                  <button
                    onClick={() => navigate("/products")}
                    className="w-full border-2 border-[#7A1E2D] text-[#7A1E2D] hover:bg-[#7A1E2D] hover:text-white transition py-4 rounded-2xl font-semibold"
                  >
                    Add More Items
                  </button>

                  <a
                    href={getWhatsAppCartLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#03a685] hover:bg-[#02856b] text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg shadow-lg transition"
                  >
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