"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="p-2 -ml-2 active:scale-95 transition-transform touch-manipulation"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">Your Cart</h1>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious items from our menu
          </p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold active:scale-95 transition-transform touch-manipulation"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link
          href="/"
          className="p-2 -ml-2 active:scale-95 transition-transform touch-manipulation"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">
          Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>
      </header>

      <main className="p-4">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl border border-border p-3 flex gap-3"
            >
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-card-foreground truncate">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive active:scale-95 transition-all touch-manipulation"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary">
                    ₹{item.price * item.quantity}
                  </span>

                  <div className="flex items-center gap-2 bg-primary/10 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-primary active:scale-95 transition-transform touch-manipulation"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-primary w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-primary active:scale-95 transition-transform touch-manipulation"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-card rounded-xl border border-border p-4">
          <h3 className="font-semibold text-card-foreground mb-3">Bill Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Item Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="text-accent font-medium">FREE</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold text-card-foreground">
              <span>To Pay</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 pb-safe">
        <Link
          href="/checkout"
          className="flex items-center justify-center w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg active:scale-[0.98] transition-transform touch-manipulation"
        >
          Proceed to Checkout - ₹{totalPrice}
        </Link>
      </div>
    </div>
  )
}
