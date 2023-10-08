import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Search from "@/components/Search"

export default function SearchPage() {
    return (
        <>
            <Header />
            <div style={{overflow: 'auto'}}>
                <Search />
            </div>
            <Footer />
        </>
    )
}