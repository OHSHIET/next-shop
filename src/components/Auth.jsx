import styles from '../style/Auth.module.css'
import Link from 'next/link'

export default function Auth(props) {
    return (
        <div className={styles.auth}>
            <div className={styles.auth_insider}>
                <div className={styles.heading}>
                    <h1 className={styles.header}>{props.header}</h1>
                    <div className={styles.underHeader}>{props.underHeaderTxt}? <Link href={props.underHeaderLink}>{props.underHeaderLinkTxt}</Link></div>
                </div>
                <div className={styles.form}>
                    
                </div>
            </div>
        </div>
    )
}