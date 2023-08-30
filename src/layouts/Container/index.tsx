export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="h-full flex-1 overflow-y-auto p-4">{children}</div>
}
