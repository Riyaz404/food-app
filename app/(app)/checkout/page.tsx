"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, CreditCard, Banknote } from "lucide-react"
import { useCart } from "@/context/cart-context"

const WHATSAPP_NUMBER = "916303671353" // Replace with actual number

type PaymentMethod = "cod" | "upi"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePlaceOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill all fields")
      return
    }

    if (phone.length < 10) {
      alert("Please enter a valid phone number")
      return
    }

    setIsSubmitting(true)

    // Generate order message
    const orderItems = items
      .map((item) => `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})`)
      .join("\n")

    const message = `*New Order - Geniue Food*

*Customer Details:*
Name: ${name}
Phone: ${phone}
Address: ${address}

*Order:*
${orderItems}

*Total: ₹${totalPrice}*
*Payment: ${paymentMethod === "cod" ? "Cash on Delivery" : "UPI"}*

Prepare fresh!`

    // Encode and redirect to WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    // Clear cart and redirect
    clearCart()
    window.open(whatsappUrl, "_blank")
    router.push("/order-success")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">No items to checkout</h2>
        <p className="text-muted-foreground mb-6">Add some items to your cart first</p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold active:scale-95 transition-transform touch-manipulation"
        >
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link
          href="/cart"
          className="p-2 -ml-2 active:scale-95 transition-transform touch-manipulation"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">Checkout</h1>
      </header>

      <main className="p-4 space-y-4">
        {/* Delivery Details */}
        <section className="bg-card rounded-xl border border-border p-4">
          <h2 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Delivery Details
          </h2>

          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-muted-foreground mb-1 block">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-muted-foreground mb-1 block">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10 digit mobile number"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-medium text-muted-foreground mb-1 block">
                Delivery Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat no., Street, Landmark, Area"
                rows={3}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          </div> 
        </section>

        {/* Payment Method */}
        <section className="bg-card rounded-xl border border-border p-4">
          <h2 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Method
          </h2>

          <div className="space-y-2">
            <label
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                paymentMethod === "cod"
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "cod" ? "border-primary" : "border-muted-foreground"
              }`}>
                {paymentMethod === "cod" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <Banknote className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-card-foreground">Cash on Delivery</span>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                paymentMethod === "upi"
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "upi" ? "border-primary" : "border-muted-foreground"
              }`}>
                {paymentMethod === "upi" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-card-foreground">UPI Payment</span>
            </label>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-card rounded-xl border border-border p-4">
          <h2 className="font-semibold text-card-foreground mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-muted-foreground">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-bold text-card-foreground">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 pb-safe">
        <button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg active:scale-[0.98] transition-transform touch-manipulation disabled:opacity-70"
        >
          {isSubmitting ? "Processing..." : `Place Order via WhatsApp - ₹${totalPrice}`}
        </button>
      </div>
    </div>
  )
}
