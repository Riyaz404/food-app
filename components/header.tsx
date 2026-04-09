"use client"

import Link from "next/link"
import { MapPin, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Geniue Food</span>
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              LIVE
            </span>
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Kukatpally, Hyderabad | Authentic Telugu Non-Veg
          </span>
        </Link>
        
        <Link
          href="/login"
          className="p-2.5 bg-secondary rounded-full text-secondary-foreground active:scale-95 transition-transform touch-manipulation"
          aria-label="Login"
        >
          <User className="w-5 h-5" />
        </Link>
      </div>
    </header>
  )
}
