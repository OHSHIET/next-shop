import styles from '../style/Auth.module.css'
import Link from 'next/link'

export default function Auth(props) {
    return (
        <>
            <div className={styles.back}>
                <Link href="/">&lt; Back</Link>
            </div>
            <div className={styles.auth}>
                <div className={styles.auth_insider}>
                    <div className={styles.heading}>
                        <h1 className={styles.header}>Sign in</h1>
                        <div className={styles.underHeader}>Not a member yet? Sign up here!</div>
                    </div>
                    <div className={styles.form}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}