"use client"

import Image from "next/image"
import { Plus, Minus, Flame, Sparkles, IndianRupee } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { MenuItemWithBadges, BadgeType } from "@/data/menu"

interface FoodCardProps {
  item: MenuItemWithBadges
}

const badgeConfig: Record<BadgeType, { label: string; className: string; icon?: React.ReactNode }> = {
  bestseller: {
    label: "Best Seller",
    className: "bg-orange-500 text-white",
    icon: <Flame className="w-3 h-3" />,
  },
  budget: {
    label: "Budget",
    className: "bg-green-500 text-white",
    icon: <IndianRupee className="w-3 h-3" />,
  },
  fresh: {
    label: "Fresh",
    className: "bg-emerald-500 text-white",
    icon: <Sparkles className="w-3 h-3" />,
  },
  spicy: {
    label: "Spicy",
    className: "bg-red-500 text-white",
    icon: <Flame className="w-3 h-3" />,
  },
}

export function FoodCard({ item }: FoodCardProps) {
  const { items, addItem, updateQuantity } = useCart()
  const [showAdded, setShowAdded] = useState(false)
  
  const cartItem = items.find((i) => i.id === item.id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = () => {
    addItem(item)
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 1000)
  }

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(item.id, quantity - 1)
    }
  }

  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1)
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border flex gap-3 p-3 relative">
      {/* Image with badges */}
      <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="112px"
        />
        {/* Badges overlay */}
        {item.badges && item.badges.length > 0 && (
          <div className="absolute top-1 left-1 flex flex-col gap-1">
            {item.badges.slice(0, 2).map((badge) => {
              const config = badgeConfig[badge]
              return (
                <span
                  key={badge}
                  className={cn(
                    "flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold",
                    config.className
                  )}
                >
                  {config.icon}
                  {config.label}
                </span>
              )
            })}
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="font-semibold text-card-foreground text-base leading-tight line-clamp-2">
            {item.name}
          </h3>
          {item.tag && (
            <p className="text-primary text-xs font-medium mt-0.5">
              {item.tag}
            </p>
          )}
          {item.description && (
            <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-foreground text-lg">
            ₹{item.price}
          </span>
          
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="relative bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-1 active:scale-95 transition-transform touch-manipulation shadow-md"
            >
              <Plus className="w-4 h-4" />
              ADD
              {showAdded && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
                  Added!
                </span>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-primary rounded-lg shadow-md">
              <button
                onClick={handleDecrease}
                className="p-2.5 text-primary-foreground active:scale-95 transition-transform touch-manipulation"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-bold text-primary-foreground w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="p-2.5 text-primary-foreground active:scale-95 transition-transform touch-manipulation"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
