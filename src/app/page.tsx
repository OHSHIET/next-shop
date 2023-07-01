import Header from '../components/Header.jsx'
import MainContent from '../components/MainContent.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Products from '../components/Products.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <MainContent>
          <Sidebar />
          <Products />
        </MainContent>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}
