import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import Auth from '../../components/Auth.jsx'
import Link from 'next/link'

export default function Register() {
    return (
        <>
            <Header />
            <Auth
                header="Sign up"
                underHeaderTxt='Already have an account'
                underHeaderLink='/login'
                underHeaderLinkTxt='Sign in'>
                123    
            </Auth>
            <Footer />
        </>
    )
}