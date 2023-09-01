import Auth from '~/features/Auth/Auth'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex-1 overflow-y-auto pt-navbar">
      <Auth />
      {children}
    </div>
  )
}
