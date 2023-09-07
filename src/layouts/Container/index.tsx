import Auth from '~/features/Auth/Auth'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-1px flex-1 pt-navbar">
      <Auth />
      <div className="h-full w-full transform-gpu overflow-y-auto scroll-smooth will-change-scroll">
        {children}
      </div>
    </div>
  )
}
