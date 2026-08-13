"use client";

import React, { useState, useMemo } from "react";
import {
  Search, ShoppingBag, User, Home, X, Plus, Minus, MapPin, Phone,
  CreditCard, CheckCircle2, ChevronRight, LogOut, ArrowRight, Truck
} from "lucide-react";
import { PRODUCTS, SWATCHES, CATEGORIES } from "./data";

function Swatch({ product, className = "" }) {
  return (
    <div
      className={`relative flex items-end justify-start overflow-hidden ${className}`}
      style={{ background: "#E4E0D5" }}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: SWATCHES[product.swatch] }}
        />
      )}

      <span
        className="relative z-10 text-[11px] tracking-widest uppercase p-3"
        style={{
          color: "rgba(255,255,255,0.75)",
          fontFamily: "Inter, sans-serif",
          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}
      >
        {product.category}
      </span>
    </div>
  );
}

function ProductCard({ product, onAdd, onOpen }) {
  return (
    <div className="group cursor-pointer" onClick={() => onOpen(product)}>
      <Swatch product={product} className="w-full aspect-[4/5] mb-3" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <p
            className="text-[15px] leading-tight"
            style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}
          >
            {product.name}
          </p>
          <p className="text-[12px] mt-1" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
            £{product.price}.00
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          className="shrink-0 border text-[11px] uppercase tracking-wide px-3 py-2 transition-colors"
          style={{ borderColor: "#17181B", fontFamily: "Inter, sans-serif", color: "#17181B" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#17181B";
            e.currentTarget.style.color = "#FAF8F3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#17181B";
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function Header({ page, setPage, cartCount, user }) {
  const navItem = (key, label, Icon, badge) => (
    <button
      onClick={() => setPage(key)}
      className="flex items-center gap-1.5 text-[13px] uppercase tracking-wide relative px-1"
      style={{
        fontFamily: "Inter, sans-serif",
        color: page === key ? "#17181B" : "#8B8579",
        borderBottom: page === key ? "2px solid #2A3EFF" : "2px solid transparent",
        paddingBottom: "6px",
      }}
    >
      <Icon size={16} strokeWidth={1.5} />
      <span className="hidden sm:inline">{label}</span>
      {badge > 0 && (
        <span
          className="absolute -top-2 -right-3 text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
          style={{ background: "#2A3EFF", color: "#fff" }}
        >
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-10 py-4"
      style={{ background: "#FAF8F3", borderBottom: "1px solid #E4E0D5" }}
    >
      <button onClick={() => setPage("home")} className="flex items-baseline gap-1">
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, color: "#17181B" }}>
          FOLD
        </span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#8B8579" }}>
          &nbsp;co.
        </span>
      </button>
      <nav className="flex items-center gap-5 sm:gap-7">
        {navItem("home", "Home", Home, 0)}
        {navItem("shop", "Shop", ShoppingBag, 0)}
        {navItem("search", "Search", Search, 0)}
        {navItem("cart", "Cart", ShoppingBag, cartCount)}
        {navItem("account", user ? user.name.split(" ")[0] : "Account", User, 0)}
      </nav>
    </header>
  );
}

function Marquee() {
  const items = ["New arrivals weekly", "Free delivery over £120", "Made to last", "60% off holiday edit"];
  return (
    <div
      className="overflow-hidden whitespace-nowrap py-2"
      style={{ background: "#17181B", borderTop: "1px solid #17181B", borderBottom: "1px solid #17181B" }}
    >
      <div className="inline-block animate-[scroll_22s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="text-[12px] tracking-widest uppercase mx-6"
            style={{ color: "#FAF8F3", fontFamily: "Inter, sans-serif" }}
          >
            {t} &nbsp;•
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function HomePage({ setPage, onAdd, onOpen }) {
  const bestSellers = PRODUCTS.slice(0, 6);
  return (
    <div>
      <section className="grid sm:grid-cols-2 items-stretch">
        <div className="flex flex-col justify-center px-6 sm:px-16 py-16 sm:py-24" style={{ background: "#FAF8F3" }}>
          <span
            className="text-[12px] uppercase tracking-[0.2em] mb-4"
            style={{ color: "#2A3EFF", fontFamily: "Inter, sans-serif" }}
          >
            Autumn / Winter Edit
          </span>
          <h1
            className="text-[42px] sm:text-[56px] leading-[1.05] mb-6"
            style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}
          >
            Clothes built for
            <br />
            <em style={{ fontStyle: "italic" }}>the long wear.</em>
          </h1>
          <p className="text-[15px] max-w-sm mb-8" style={{ color: "#5B5952", fontFamily: "Inter, sans-serif" }}>
            Honest materials, considered cuts. A small collection, chosen carefully so you don't have to.
          </p>
          <button
            onClick={() => setPage("shop")}
            className="inline-flex items-center gap-2 w-fit px-6 py-3 text-[13px] uppercase tracking-wide"
            style={{ background: "#17181B", color: "#FAF8F3", fontFamily: "Inter, sans-serif" }}
          >
            Shop the edit <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1 p-1" style={{ background: "#E4E0D5" }}>
          {PRODUCTS.slice(0, 4).map((p) => (
            <Swatch key={p.id} product={p} className="w-full h-full min-h-[160px]" />
          ))}
        </div>
      </section>

      <Marquee />

      <section className="px-5 sm:px-10 py-12">
        <h2
          className="text-[13px] uppercase tracking-[0.2em] mb-6"
          style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}
        >
          Shop by category
        </h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.filter((c) => c !== "All").map((c) => (
            <button
              key={c}
              onClick={() => setPage("shop")}
              className="px-4 py-2 text-[13px] border"
              style={{ borderColor: "#E4E0D5", color: "#17181B", fontFamily: "Inter, sans-serif" }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-10 pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: "#17181B" }}>Best sellers</h2>
          <button
            onClick={() => setPage("shop")}
            className="text-[12px] uppercase tracking-wide flex items-center gap-1"
            style={{ color: "#2A3EFF", fontFamily: "Inter, sans-serif" }}
          >
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-9">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchPage({ onAdd, onOpen }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="px-5 sm:px-10 py-12 min-h-[60vh]">
      <h1 className="text-[28px] mb-6" style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}>
        Search the collection
      </h1>
      <div className="relative max-w-xl mb-10">
        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8B8579" }} />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try 'sweater' or 'denim'..."
          className="w-full pl-10 pr-4 py-3 text-[14px] outline-none"
          style={{ border: "1px solid #E4E0D5", fontFamily: "Inter, sans-serif", background: "#fff" }}
        />
      </div>

      {q.trim() && (
        <p className="text-[13px] mb-6" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
          {results.length} result{results.length !== 1 ? "s" : ""} for "{q}"
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} />
        ))}
      </div>

      {q.trim() && results.length === 0 && (
        <p className="text-[14px]" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
          Nothing matched. Try a different word.
        </p>
      )}
    </div>
  );
}

function ShopPage({ onAdd, onOpen }) {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <div className="px-5 sm:px-10 py-12">
      <h1 className="text-[28px] mb-6" style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}>
        All products
      </h1>
      <div className="flex flex-wrap gap-2 mb-9">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className="px-4 py-2 text-[12px] uppercase tracking-wide"
            style={{
              fontFamily: "Inter, sans-serif",
              background: cat === c ? "#17181B" : "transparent",
              color: cat === c ? "#FAF8F3" : "#17181B",
              border: "1px solid " + (cat === c ? "#17181B" : "#E4E0D5"),
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: "rgba(23,24,27,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl grid sm:grid-cols-2 overflow-hidden"
        style={{ background: "#FAF8F3" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Swatch product={product} className="w-full h-64 sm:h-full" />
        <div className="p-8 relative flex flex-col">
          <button onClick={onClose} className="absolute top-4 right-4" style={{ color: "#8B8579" }}>
            <X size={20} />
          </button>
          <span
            className="text-[11px] uppercase tracking-widest mb-2"
            style={{ color: "#2A3EFF", fontFamily: "Inter, sans-serif" }}
          >
            {product.category}
          </span>
          <h2 className="text-[26px] mb-2" style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}>
            {product.name}
          </h2>
          <p className="text-[18px] mb-5" style={{ color: "#5B5952", fontFamily: "Inter, sans-serif" }}>
            £{product.price}.00
          </p>
          <p className="text-[13px] mb-8 leading-relaxed" style={{ color: "#5B5952", fontFamily: "Inter, sans-serif" }}>
            Cut from durable, breathable material and finished by hand. A considered piece meant to be worn on
            repeat, season after season.
          </p>
          <button
            onClick={() => {
              onAdd(product);
              onClose();
            }}
            className="mt-auto w-full py-3 text-[13px] uppercase tracking-wide"
            style={{ background: "#17181B", color: "#FAF8F3", fontFamily: "Inter, sans-serif" }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

function CartPage({ cart, updateQty, removeItem, subtotal, checkoutStep, setCheckoutStep, delivery, setDelivery, order, placeOrder }) {
  const inputStyle = {
    fontFamily: "Inter, sans-serif",
    border: "1px solid #E4E0D5",
    padding: "10px 12px",
    fontSize: 13,
    width: "100%",
    outline: "none",
    background: "#fff",
  };
  const labelStyle = { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8B8579", fontFamily: "Inter, sans-serif", marginBottom: 6, display: "block" };

  if (checkoutStep === "confirmed") {
    return (
      <div className="px-5 sm:px-10 py-24 flex flex-col items-center text-center min-h-[60vh]">
        <CheckCircle2 size={40} style={{ color: "#2A3EFF" }} className="mb-4" />
        <h1 className="text-[26px] mb-2" style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}>
          Order placed
        </h1>
        <p className="text-[13px] mb-1" style={{ color: "#5B5952", fontFamily: "Inter, sans-serif" }}>
          Order #{order.id} · £{order.total.toFixed(2)}
        </p>
        <p className="text-[13px] max-w-sm" style={{ color: "#5B5952", fontFamily: "Inter, sans-serif" }}>
          Delivering to {order.address.location}. You'll get updates by text at {order.address.phone}.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="px-5 sm:px-10 py-24 text-center min-h-[60vh]">
        <p className="text-[15px]" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-10 py-12 grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <h1 className="text-[26px] mb-8" style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}>
          {checkoutStep === "cart" ? "Your cart" : checkoutStep === "delivery" ? "Delivery details" : "Payment"}
        </h1>

        {checkoutStep === "cart" &&
          cart.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 py-4" style={{ borderBottom: "1px solid #E4E0D5" }}>
              <Swatch product={product} className="w-20 h-24 shrink-0" />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: 15, color: "#17181B" }}>{product.name}</p>
                    <p className="text-[12px]" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
                      £{product.price}.00
                    </p>
                  </div>
                  <button onClick={() => removeItem(product.id)} style={{ color: "#8B8579" }}>
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQty(product.id, qty - 1)}
                    className="w-7 h-7 flex items-center justify-center border"
                    style={{ borderColor: "#E4E0D5" }}
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[13px] w-4 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                    {qty}
                  </span>
                  <button
                    onClick={() => updateQty(product.id, qty + 1)}
                    className="w-7 h-7 flex items-center justify-center border"
                    style={{ borderColor: "#E4E0D5" }}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {checkoutStep === "delivery" && (
          <div className="max-w-md flex flex-col gap-4">
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                style={inputStyle}
                value={delivery.name}
                onChange={(e) => setDelivery({ ...delivery, name: e.target.value })}
                placeholder="Jordan Reyes"
              />
            </div>
            <div>
              <label style={labelStyle}>Phone number</label>
              <input
                style={inputStyle}
                value={delivery.phone}
                onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                placeholder="+44 7700 900123"
              />
            </div>
            <div>
              <label style={labelStyle}>Delivery address</label>
              <input
                style={inputStyle}
                value={delivery.location}
                onChange={(e) => setDelivery({ ...delivery, location: e.target.value })}
                placeholder="14 Camden Row, London"
              />
            </div>
            {delivery.error && (
              <p className="text-[12px]" style={{ color: "#B7472A", fontFamily: "Inter, sans-serif" }}>
                {delivery.error}
              </p>
            )}
          </div>
        )}

        {checkoutStep === "payment" && (
          <div className="max-w-md flex flex-col gap-4">
            <div>
              <label style={labelStyle}>Card number</label>
              <input style={inputStyle} placeholder="4242 4242 4242 4242" maxLength={19} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label style={labelStyle}>Expiry</label>
                <input style={inputStyle} placeholder="MM/YY" />
              </div>
              <div className="flex-1">
                <label style={labelStyle}>CVC</label>
                <input style={inputStyle} placeholder="123" />
              </div>
            </div>
            <div className="flex items-start gap-2 mt-2 p-3" style={{ background: "#F1EFE8" }}>
              <Truck size={16} style={{ color: "#8B8579", marginTop: 2 }} />
              <p className="text-[12px]" style={{ color: "#5B5952", fontFamily: "Inter, sans-serif" }}>
                Delivering to <strong>{delivery.name}</strong>, {delivery.location}. Estimated 3–5 business days.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="p-6 sticky top-24" style={{ background: "#F1EFE8" }}>
          <h2 className="text-[13px] uppercase tracking-widest mb-4" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
            Order summary
          </h2>
          <div className="flex justify-between text-[13px] mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#17181B" }}>
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[13px] mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#17181B" }}>
            <span>Delivery</span>
            <span>{subtotal > 120 ? "Free" : "£6.00"}</span>
          </div>
          <div
            className="flex justify-between text-[15px] pt-4 mb-6"
            style={{ borderTop: "1px solid #D7D2C4", fontFamily: "'Fraunces', serif", color: "#17181B" }}
          >
            <span>Total</span>
            <span>£{(subtotal + (subtotal > 120 || subtotal === 0 ? 0 : 6)).toFixed(2)}</span>
          </div>

          {checkoutStep === "cart" && (
            <button
              onClick={() => setCheckoutStep("delivery")}
              className="w-full py-3 text-[13px] uppercase tracking-wide"
              style={{ background: "#17181B", color: "#FAF8F3", fontFamily: "Inter, sans-serif" }}
            >
              Proceed to checkout
            </button>
          )}
          {checkoutStep === "delivery" && (
            <button
              onClick={() => {
                if (!delivery.name || !delivery.phone || !delivery.location) {
                  setDelivery({ ...delivery, error: "Fill in all delivery details to continue." });
                  return;
                }
                setDelivery({ ...delivery, error: "" });
                setCheckoutStep("payment");
              }}
              className="w-full py-3 text-[13px] uppercase tracking-wide flex items-center justify-center gap-2"
              style={{ background: "#17181B", color: "#FAF8F3", fontFamily: "Inter, sans-serif" }}
            >
              Continue to payment <CreditCard size={14} />
            </button>
          )}
          {checkoutStep === "payment" && (
            <button
              onClick={placeOrder}
              className="w-full py-3 text-[13px] uppercase tracking-wide"
              style={{ background: "#2A3EFF", color: "#fff", fontFamily: "Inter, sans-serif" }}
            >
              Place order — buy now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AccountPage({ user, setUser }) {
  const [form, setForm] = useState({ name: "", phone: "", location: "" });
  const [error, setError] = useState("");

  const inputStyle = {
    fontFamily: "Inter, sans-serif",
    border: "1px solid #E4E0D5",
    padding: "10px 12px",
    fontSize: 13,
    width: "100%",
    outline: "none",
    background: "#fff",
  };
  const labelStyle = { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8B8579", fontFamily: "Inter, sans-serif", marginBottom: 6, display: "block" };

  if (user) {
    return (
      <div className="px-5 sm:px-10 py-16 max-w-md">
        <h1 className="text-[26px] mb-8" style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}>
          Your account
        </h1>
        <div className="p-6 mb-6" style={{ background: "#F1EFE8" }}>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-[15px]"
              style={{ background: "#17181B", color: "#FAF8F3", fontFamily: "'Fraunces', serif" }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: "#17181B" }}>{user.name}</p>
              <p className="text-[12px]" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
                Member
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[13px] mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#5B5952" }}>
            <Phone size={14} /> {user.phone}
          </div>
          <div className="flex items-center gap-2 text-[13px]" style={{ fontFamily: "Inter, sans-serif", color: "#5B5952" }}>
            <MapPin size={14} /> {user.location}
          </div>
        </div>
        <button
          onClick={() => setUser(null)}
          className="flex items-center gap-2 text-[13px] uppercase tracking-wide"
          style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}
        >
          <LogOut size={14} /> Log out
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-10 py-16 max-w-md">
      <h1 className="text-[26px] mb-2" style={{ fontFamily: "'Fraunces', serif", color: "#17181B" }}>
        Sign in
      </h1>
      <p className="text-[13px] mb-8" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
        Enter your details to save orders and delivery info.
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <label style={labelStyle}>Name</label>
          <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jordan Reyes" />
        </div>
        <div>
          <label style={labelStyle}>Phone number</label>
          <input style={inputStyle} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+44 7700 900123" />
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="London, UK" />
        </div>
        {error && (
          <p className="text-[12px]" style={{ color: "#B7472A", fontFamily: "Inter, sans-serif" }}>
            {error}
          </p>
        )}
        <button
          onClick={() => {
            if (!form.name || !form.phone || !form.location) {
              setError("Fill in all fields to sign in.");
              return;
            }
            setUser(form);
          }}
          className="w-full py-3 text-[13px] uppercase tracking-wide mt-2"
          style={{ background: "#17181B", color: "#FAF8F3", fontFamily: "Inter, sans-serif" }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default function FoldShop() {
  const [page, setPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [delivery, setDelivery] = useState({ name: "", phone: "", location: "", error: "" });
  const [order, setOrder] = useState(null);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id) => setCartItems((prev) => prev.filter((i) => i.product.id !== id));

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const placeOrder = () => {
    const total = subtotal + (subtotal > 120 || subtotal === 0 ? 0 : 6);
    setOrder({ id: Math.floor(100000 + Math.random() * 900000), total, address: delivery });
    setCheckoutStep("confirmed");
    setCartItems([]);
  };

  const goToCart = () => {
    setCheckoutStep(cartItems.length ? "cart" : "cart");
    setPage("cart");
  };

  return (
    <div style={{ background: "#FAF8F3", minHeight: "100vh" }}>
      <Header
        page={page}
        setPage={(p) => {
          if (p === "cart") goToCart();
          else setPage(p);
        }}
        cartCount={cartCount}
        user={user}
      />

      {page === "home" && <HomePage setPage={setPage} onAdd={addToCart} onOpen={setModalProduct} />}
      {page === "search" && <SearchPage onAdd={addToCart} onOpen={setModalProduct} />}
      {page === "shop" && <ShopPage onAdd={addToCart} onOpen={setModalProduct} />}
      {page === "cart" && (
        <CartPage
          cart={cartItems}
          updateQty={updateQty}
          removeItem={removeItem}
          subtotal={subtotal}
          checkoutStep={checkoutStep}
          setCheckoutStep={setCheckoutStep}
          delivery={delivery}
          setDelivery={setDelivery}
          order={order}
          placeOrder={placeOrder}
        />
      )}
      {page === "account" && <AccountPage user={user} setUser={setUser} />}

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAdd={addToCart} />

      <footer className="px-5 sm:px-10 py-10 mt-10" style={{ borderTop: "1px solid #E4E0D5" }}>
        <p className="text-[12px]" style={{ color: "#8B8579", fontFamily: "Inter, sans-serif" }}>
          © {new Date().getFullYear()} FOLD co. — clothes built for the long wear.
        </p>
      </footer>
    </div>
  );
}
