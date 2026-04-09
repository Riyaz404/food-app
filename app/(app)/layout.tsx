import { CartProvider } from "@/context/cart-context"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CartProvider>{children}</CartProvider>
}
