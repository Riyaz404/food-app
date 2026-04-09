"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Phone, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number")
      return
    }
    setIsLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
    }, 1000)
  }

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      alert("Please enter a valid 4-digit OTP")
      return
    }
    setIsLoading(true)
    // Simulate OTP verification - for demo, any 4-digit OTP works
    setTimeout(() => {
      setIsLoading(false)
      // Store user info in localStorage for demo
      localStorage.setItem("geniue_user", JSON.stringify({ phone }))
      router.push("/")
    }, 1000)
  }

  const handleSkip = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-3 flex items-center gap-3">
        <Link
          href="/"
          className="p-2 -ml-2 active:scale-95 transition-transform touch-manipulation"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {step === "phone" ? "Welcome" : "Verify OTP"}
          </h1>
          <p className="text-muted-foreground">
            {step === "phone"
              ? "Enter your phone number to continue"
              : `We sent a code to +91 ${phone}`}
          </p>
        </div>

        {step === "phone" ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-muted-foreground mb-2 block">
                Phone Number
              </label>
              <div className="flex items-center gap-2 bg-input border border-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/50">
                <span className="text-muted-foreground font-medium">+91</span>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10 digit number"
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
                  autoFocus
                />
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <button
              onClick={handleSendOtp}
              disabled={isLoading || phone.length !== 10}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform touch-manipulation disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Get OTP"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="text-sm font-medium text-muted-foreground mb-2 block">
                Enter OTP
              </label>
              <input
                id="otp"
                type="tel"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="Enter 4 digit OTP"
                className="w-full bg-input border border-border rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-2xl text-center tracking-[0.5em] font-mono"
                autoFocus
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length !== 4}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform touch-manipulation disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setStep("phone")}
              className="w-full text-primary font-medium py-2 active:scale-95 transition-transform touch-manipulation"
            >
              Change Phone Number
            </button>
          </div>
        )}

        <button
          onClick={handleSkip}
          className="mt-8 text-muted-foreground font-medium py-2 active:scale-95 transition-transform touch-manipulation"
        >
          Skip for now
        </button>

        <p className="mt-auto pb-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </main>
    </div>
  )
}
