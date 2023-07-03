import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import Auth from '../../components/Auth.jsx'
import Link from 'next/link'

export default function Login() {
    return (
        <>
            <Header />
            <Auth
                header="Sign in"
                underHeaderTxt='Not a member yet'
                underHeaderLink='/register'
                underHeaderLinkTxt='Sign up'>
                123    
            </Auth>
            <Footer />
        </>
    )
}