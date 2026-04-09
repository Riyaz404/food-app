"use client"

import { Utensils, Package, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap = {
  utensils: Utensils,
  package: Package,
  zap: Zap,
}

interface Category {
  id: string
  name: string
  icon: keyof typeof iconMap
}

interface CategoryTabsProps {
  categories: readonly Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const Icon = iconMap[category.icon]
          const isActive = activeCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all touch-manipulation active:scale-95",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
