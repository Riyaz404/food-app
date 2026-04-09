"use client"

import Link from "next/link"
import { CheckCircle, ChefHat, ArrowRight } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-accent/20 rounded-full p-6 mb-6">
        <CheckCircle className="w-16 h-16 text-accent" />
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">
        Order Sent Successfully!
      </h1>
      
      <div className="flex items-center gap-2 text-primary mb-4">
        <ChefHat className="w-6 h-6" />
        <span className="font-semibold">Kitchen is preparing your food</span>
      </div>

      <p className="text-muted-foreground mb-8 max-w-xs">
        Your order has been sent to the kitchen via WhatsApp. They will contact you shortly to confirm.
      </p>

      <div className="bg-card border border-border rounded-xl p-4 mb-8 w-full max-w-xs">
        <h3 className="font-semibold text-card-foreground mb-2">What&apos;s Next?</h3>
        <ul className="text-sm text-muted-foreground text-left space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
            <span>Kitchen confirms your order on WhatsApp</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
            <span>Fresh food is prepared just for you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
            <span>Delivery arrives at your doorstep</span>
          </li>
        </ul>
      </div>

      <Link
        href="/"
        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold active:scale-95 transition-transform touch-manipulation"
      >
        Order More
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  )
}
