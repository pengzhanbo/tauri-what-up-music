export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-navbar h-full flex-1 overflow-y-auto">{children}</div>
  )
}
