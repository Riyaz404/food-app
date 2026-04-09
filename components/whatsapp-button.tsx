"use client"

import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "919999999999" // Replace with actual number

export function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent("Hi! I want to know more about Geniue Food.")
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-4 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg shadow-[#25D366]/30 active:scale-95 transition-transform touch-manipulation"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  )
}
