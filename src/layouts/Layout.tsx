import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden">
      <Header />
      <div className="pb-audio h-100vh w-full flex items-center justify-start overflow-hidden">
        <Sidebar />
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  )
}
