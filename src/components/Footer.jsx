import styles from '../style/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer id={styles.sticky} className="fixed-bottom flex-shrink-0 py-4 bg-dark text-white-50">
            <div className={`"container" ${styles.flex}`}>
                <div className={styles.txt}><Link href="/" className={styles.link}>Cool Link 1</Link></div>
                <div className={styles.copyright}>2023 &copy; Lev Leitckii</div>
                <div className={styles.txt}><Link href="/" className={styles.link}>Cool Link 2</Link></div>
            </div>
        </footer>
    );
}