"use client"

import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

export function StickyCartBar() {
  const { totalItems, totalPrice } = useCart()

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe">
      <Link
        href="/cart"
        className={cn(
          "flex items-center justify-between w-full max-w-lg mx-auto",
          "bg-primary text-primary-foreground rounded-2xl px-5 py-4",
          "shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform touch-manipulation"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <span className="font-semibold">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">₹{totalPrice}</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </Link>
    </div>
  )
}
