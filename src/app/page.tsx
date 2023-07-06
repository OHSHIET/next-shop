import Header from '../components/Header.jsx'
import MainContent from '../components/MainContent.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Products from '../components/Products.jsx'
import Footer from '../components/Footer.jsx'

export default async function Home() {


  return (
    <>
        <Header />

        <MainContent>
          <Sidebar />
          <Products />
        </MainContent>
        
        <Footer />
    </>
  )
}
