"use client"

import { useState, useMemo } from "react"
import { Header } from "./header"
import { CategoryTabs } from "./category-tabs"
import { FoodCard } from "./food-card"
import { StickyCartBar } from "./sticky-cart-bar"
import { WhatsAppButton } from "./whatsapp-button"
import { categories, menuItems } from "@/data/menu"

const categoryTitles: Record<string, string> = {
  meals: "Main Meals",
  combos: "Budget Combos",
  quick: "Quick Items",
}

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("meals")

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />
      
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">
            {categoryTitles[activeCategory] || activeCategory}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredItems.length} items
          </span>
        </div>
        
        <div className="flex flex-col gap-3">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <WhatsAppButton />
      <StickyCartBar />
    </div>
  )
}
