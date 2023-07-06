import styles from '../style/Header.module.css';
import Link from 'next/link';

import { getServerSession } from "next-auth/next"
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default async function Header() {

    const session = await getServerSession(authOptions)

    return (
        <header>
            <nav className={`${styles.head} navbar navbar-dark navbar-expand-lg bg-dark`}>
                <div className="container-fluid">
                    <Link className={`${styles.brand} navbar-brand`} href="/"><span className={styles.logo}>Next</span> Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        {session ?
                            <>
                                <div className={styles.login}>
                                    <FontAwesomeIcon icon={faCheck} width="14px" style={{ color: "#71ff7b", marginRight: "2px" }} /> {session.user.name}: <Link href="/api/auth/signout">Log out</Link>
                                </div>
                            </>
                            :
                            <div className={styles.login}>
                               <Link href="/login">Log in</Link>
                            </div>
                        }
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Find something..." aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}