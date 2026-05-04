"use client";

import { useEffect, useState } from "react";
import { products } from "@/data/products";

export default function Page() {
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">🛒 My Store</h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded">
            <img src={p.image} alt={p.name} className="h-40 w-full" />
            <h2>{p.name}</h2>
            <p>${p.price}</p>
            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 w-full max-w-2xl">
        <h2>Your Cart</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.qty}</span>
            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}

        <h3>Total: ${total.toFixed(2)}</h3>

        <button onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}