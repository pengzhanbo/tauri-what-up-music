import Auth from '~/features/Auth/Auth'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex-1 pt-navbar">
      <Auth />
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </div>
  )
}
